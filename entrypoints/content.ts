import { mountAssistant } from '../src/app';
import { initPayOpenAiAddressAutofill } from '../src/features/address-autofill/pay-openai-autofill';
import { initPaypalAutofill } from '../src/features/address-autofill/paypal-autofill';

const CONTENT_LOADED_KEY = '__opx_assistant_content_loaded__';
const TARGET_HOSTS = [
  'chatgpt.com',
  'chat.openai.com',
  'auth.openai.com',
  'pay.openai.com',
  'www.paypal.com',
  'paypal.com',
];

export default defineContentScript({
  matches: [
    'https://*/*',
    'http://*/*',
  ],
  runAt: 'document_idle',
  registration: 'manifest',
  allFrames: true,
  main() {
    const scope = globalThis as unknown as Partial<Record<typeof CONTENT_LOADED_KEY, boolean>>;
    if (scope[CONTENT_LOADED_KEY]) {
      return;
    }
    scope[CONTENT_LOADED_KEY] = true;

    installExternalPayLinkBridge();
    if (!isAssistantTargetHost(location.hostname)) {
      return;
    }

    if (window.top === window) {
      mountAssistant();
    }
    try {
      initPayOpenAiAddressAutofill();
    } catch (error) {
      console.warn('[OPX] pay autofill init failed', error);
    }
    try {
      initPaypalAutofill();
    } catch (error) {
      console.warn('[OPX] PayPal autofill init failed', error);
    }
  },
});

function installExternalPayLinkBridge(): void {
  window.addEventListener('message', (event) => {
    if (event.source !== window || !isExternalPayLinkMessage(event.data)) {
      return;
    }

    const requestId = typeof event.data.requestId === 'string' ? event.data.requestId : '';
    void browser.runtime.sendMessage({
      type: 'opx:run-pay-link',
      pay: event.data.pay || event.data.url || event.data.link || event.data.paymentLink || '',
      incognito: event.data.incognito === true,
    }).then((response) => {
      window.postMessage({
        type: 'opx:run-pay-link-result',
        requestId,
        ...(response && typeof response === 'object' ? response : { ok: false, message: '插件返回结果无效' }),
      }, '*');
    }).catch((error) => {
      window.postMessage({
        type: 'opx:run-pay-link-result',
        requestId,
        ok: false,
        message: String(error),
      }, '*');
    });
  });
}

function isExternalPayLinkMessage(value: unknown): value is {
  type: string;
  requestId?: string;
  pay?: string;
  url?: string;
  link?: string;
  paymentLink?: string;
  incognito?: boolean;
} {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const message = value as { type?: unknown; pay?: unknown; url?: unknown; link?: unknown; paymentLink?: unknown };
  return message.type === 'opx:run-pay-link' &&
    typeof (message.pay || message.url || message.link || message.paymentLink || '') === 'string';
}

function isAssistantTargetHost(hostname: string): boolean {
  return TARGET_HOSTS.includes(hostname);
}
