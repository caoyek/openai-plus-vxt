import './style.css';
import type { CheckoutLinkResponse, CheckoutOptions, CheckoutPlanName, CheckoutRegion } from '../../src/features/link-extractor/types';

const STORAGE_KEY = 'opx.popup.paymentLink';
const TOKEN_STORAGE_KEY = 'opx.popup.accessToken';
const INCOGNITO_STORAGE_KEY = 'opx.popup.openIncognito';
const OPTIONS_STORAGE_KEY = 'opx.popup.checkoutOptions';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="opx-popup">
    <header class="opx-header">
      <strong>PayPal 支付测试</strong>
      <span>输入长链，或用 accessToken 生成长链后继续</span>
    </header>
    <div class="opx-tabs" role="tablist">
      <button id="tab-link" class="opx-tab is-active" type="button">支付长链</button>
      <button id="tab-token" class="opx-tab" type="button">accessToken</button>
    </div>
    <section id="view-link" class="opx-view">
      <label class="opx-field">
        <span>支付长链</span>
        <textarea id="payment-link" placeholder="粘贴 pay.openai.com / chatgpt.com / Stripe 支付长链"></textarea>
      </label>
    </section>
    <section id="view-token" class="opx-view" hidden>
      <label class="opx-field">
        <span>accessToken / session JSON</span>
        <textarea id="access-token" placeholder="粘贴 ChatGPT accessToken，或包含 accessToken 的 session JSON"></textarea>
      </label>
      <div class="opx-grid">
        <label class="opx-field">
          <span>套餐</span>
          <select id="plan">
            <option value="chatgptplusplan">ChatGPT Plus</option>
            <option value="chatgptteamplan">ChatGPT Team</option>
          </select>
        </label>
        <label class="opx-field">
          <span>区域</span>
          <select id="region">
            <option value="US">美国 / USD</option>
            <option value="ID">印尼 / IDR</option>
            <option value="DE">德国 / EUR</option>
            <option value="JP">日本 / JPY</option>
          </select>
        </label>
      </div>
      <div class="opx-grid">
        <label class="opx-field">
          <span>Workspace</span>
          <input id="workspace" type="text" placeholder="Team 套餐使用" />
        </label>
        <label class="opx-field">
          <span>席位</span>
          <input id="seats" type="number" min="2" step="1" />
        </label>
      </div>
    </section>
    <label class="opx-check-row">
      <input id="open-incognito" type="checkbox" />
      <span>无痕窗口打开</span>
    </label>
    <ol class="opx-steps" id="steps">
      <li data-step="source">1. 准备支付长链或 accessToken</li>
      <li data-step="generate">2. 生成 checkout 长链</li>
      <li data-step="open">3. 打开支付页面</li>
      <li data-step="pay">4. 在支付页确认自动填写结果</li>
      <li data-step="paypal">5. 跳转 PayPal 后确认填写结果</li>
    </ol>
    <div class="opx-actions">
      <button id="generate-link" type="button">生成长链</button>
      <button id="open-link" type="button" class="opx-secondary">打开当前长链</button>
    </div>
    <div id="status" class="opx-status">等待输入</div>
  </main>
`;

type PopupMode = 'link' | 'token';

const linkTab = document.querySelector<HTMLButtonElement>('#tab-link')!;
const tokenTab = document.querySelector<HTMLButtonElement>('#tab-token')!;
const linkView = document.querySelector<HTMLElement>('#view-link')!;
const tokenView = document.querySelector<HTMLElement>('#view-token')!;
const linkInput = document.querySelector<HTMLTextAreaElement>('#payment-link')!;
const tokenInput = document.querySelector<HTMLTextAreaElement>('#access-token')!;
const planSelect = document.querySelector<HTMLSelectElement>('#plan')!;
const regionSelect = document.querySelector<HTMLSelectElement>('#region')!;
const workspaceInput = document.querySelector<HTMLInputElement>('#workspace')!;
const seatsInput = document.querySelector<HTMLInputElement>('#seats')!;
const incognitoInput = document.querySelector<HTMLInputElement>('#open-incognito')!;
const generateButton = document.querySelector<HTMLButtonElement>('#generate-link')!;
const openButton = document.querySelector<HTMLButtonElement>('#open-link')!;
const status = document.querySelector<HTMLDivElement>('#status')!;
const steps = document.querySelector<HTMLElement>('#steps')!;

let mode: PopupMode = 'link';
let handledLaunchParams = false;

void restoreState();

linkTab.addEventListener('click', () => setMode('link'));
tokenTab.addEventListener('click', () => setMode('token'));

linkInput.addEventListener('input', () => {
  void browser.storage.local.set({ [STORAGE_KEY]: linkInput.value.trim() });
  setStatus(linkInput.value.trim() ? '链接已保存' : '等待输入链接', 'pending');
  setStep('source', Boolean(linkInput.value.trim()));
  setStep('generate', mode === 'link' && Boolean(linkInput.value.trim()));
});

tokenInput.addEventListener('input', () => {
  void browser.storage.local.set({ [TOKEN_STORAGE_KEY]: tokenInput.value.trim() });
  setStatus(tokenInput.value.trim() ? 'Token 已保存' : '等待输入 accessToken', 'pending');
  setStep('source', Boolean(tokenInput.value.trim()));
});

for (const input of [planSelect, regionSelect, workspaceInput, seatsInput]) {
  input.addEventListener('change', () => void saveOptions());
  input.addEventListener('input', () => void saveOptions());
}

incognitoInput.addEventListener('change', () => {
  void browser.storage.local.set({ [INCOGNITO_STORAGE_KEY]: incognitoInput.checked });
});

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  try {
    if (mode === 'link') {
      const normalized = readPaymentLink();
      if (!normalized.ok) {
        setStatus(normalized.message, 'error');
        setStep('generate', false);
        return;
      }
      linkInput.value = normalized.url;
      await browser.storage.local.set({ [STORAGE_KEY]: normalized.url });
      setStep('source', true);
      setStep('generate', true);
      setStatus('长链已准备，下一步可手动打开', 'ok');
      return;
    }
    const url = await createCheckoutLongUrl();
    if (!url.ok) {
      setStatus(url.message, 'error');
      setStep('generate', false);
      return;
    }
    setStep('source', true);
    setStep('generate', true);
    setStatus('checkout 长链已生成，下一步可手动打开', 'ok');
  } catch (error) {
    setStatus(`生成失败：${error instanceof Error ? error.message : String(error)}`, 'error');
  } finally {
    generateButton.disabled = false;
  }
});

openButton.addEventListener('click', async () => {
  const normalized = readPaymentLink();
  if (!normalized.ok) {
    setStatus(normalized.message, 'error');
    return;
  }
  openButton.disabled = true;
  try {
    await openPaymentUrl(normalized.url);
    setStep('open', true);
    setStatus('已打开支付页面，请在新窗口确认后续步骤', 'ok');
  } catch (error) {
    setStatus(`打开失败：${formatOpenError(error)}`, 'error');
  } finally {
    openButton.disabled = false;
  }
});

async function restoreState(): Promise<void> {
  const data = await browser.storage.local.get([
    STORAGE_KEY,
    TOKEN_STORAGE_KEY,
    INCOGNITO_STORAGE_KEY,
    OPTIONS_STORAGE_KEY,
  ]);
  linkInput.value = '';
  tokenInput.value = typeof data[TOKEN_STORAGE_KEY] === 'string' ? data[TOKEN_STORAGE_KEY] : '';
  incognitoInput.checked = data[INCOGNITO_STORAGE_KEY] === true;
  setOptions(data[OPTIONS_STORAGE_KEY]);
  setStatus('等待输入', 'pending');
  renderSteps();
  await handleLaunchParams();
}

function setMode(nextMode: PopupMode): void {
  mode = nextMode;
  linkTab.classList.toggle('is-active', mode === 'link');
  tokenTab.classList.toggle('is-active', mode === 'token');
  linkView.hidden = mode !== 'link';
  tokenView.hidden = mode !== 'token';
  generateButton.textContent = mode === 'link' ? '确认长链' : '生成长链';
  renderSteps();
  setStatus(mode === 'link' ? '等待输入支付长链' : '等待输入 accessToken', 'pending');
}

function readPaymentLink(): { ok: true; url: string } | { ok: false; message: string } {
  return normalizePaymentUrl(linkInput.value.trim());
}

async function createCheckoutLongUrl(): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  const raw = tokenInput.value.trim();
  if (!raw) {
    return { ok: false, message: '请先输入 accessToken 或 session JSON' };
  }
  const options = readOptions();
  setStatus('正在生成 checkout 长链...', 'pending');
  const response: CheckoutLinkResponse = await browser.runtime.sendMessage({
    type: 'opx:create-checkout-link',
    raw,
    options,
  });
  if (!response?.ok || !response.link) {
    return { ok: false, message: response?.message || '生成长链失败' };
  }
  const longUrl = response.longUrl || response.providerUrl || response.link;
  await browser.storage.local.set({ [STORAGE_KEY]: longUrl });
  linkInput.value = longUrl;
  return { ok: true, url: longUrl };
}

async function openPaymentUrl(url: string): Promise<void> {
  if (incognitoInput.checked) {
    await browser.windows.create({ url, incognito: true, focused: true });
    return;
  }
  await browser.tabs.create({ url, active: true });
}

async function handleLaunchParams(): Promise<void> {
  if (handledLaunchParams) {
    return;
  }
  handledLaunchParams = true;

  const params = new URLSearchParams(location.search);
  const rawUrl = params.get('pay') || params.get('url') || params.get('link') || params.get('paymentLink') || '';
  if (!rawUrl.trim()) {
    return;
  }

  const normalized = normalizePaymentUrl(rawUrl.trim());
  if (!normalized.ok) {
    setMode('link');
    setStatus(`参数链接无效：${normalized.message}`, 'error');
    return;
  }

  setMode('link');
  linkInput.value = normalized.url;
  await browser.storage.local.set({ [STORAGE_KEY]: normalized.url });
  setStep('source', true);
  setStep('generate', true);

  const incognitoParam = params.get('incognito') || params.get('private');
  if (isTruthyParam(incognitoParam)) {
    incognitoInput.checked = true;
    await browser.storage.local.set({ [INCOGNITO_STORAGE_KEY]: true });
  }

  if (!isTruthyParam(params.get('auto')) && !isTruthyParam(params.get('run'))) {
    setStatus('已从参数载入长链，可点击打开', 'ok');
    return;
  }

  openButton.disabled = true;
  try {
    await openPaymentUrl(normalized.url);
    setStep('open', true);
    setStatus('已按参数自动打开支付页面', 'ok');
  } catch (error) {
    setStatus(`自动打开失败：${formatOpenError(error)}`, 'error');
  } finally {
    openButton.disabled = false;
  }
}

function isTruthyParam(value: string | null): boolean {
  return /^(1|true|yes|on)$/i.test(String(value || '').trim());
}

function normalizePaymentUrl(raw: string): { ok: true; url: string } | { ok: false; message: string } {
  if (!raw) {
    return { ok: false, message: '请先输入支付长链' };
  }
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') {
      return { ok: false, message: '支付链接必须是 https 地址' };
    }
    if (!isSupportedPaymentHost(url.hostname)) {
      return { ok: false, message: '只支持 OpenAI / ChatGPT / PayPal / Stripe 支付链接' };
    }
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, message: '链接格式无效' };
  }
}

function readOptions(): CheckoutOptions {
  return {
    planName: planSelect.value as CheckoutPlanName,
    uiMode: 'hosted',
    region: regionSelect.value as CheckoutRegion,
    workspaceName: workspaceInput.value.trim() || 'MyTeam',
    seatQuantity: Number(seatsInput.value || 5),
  };
}

async function saveOptions(): Promise<void> {
  await browser.storage.local.set({ [OPTIONS_STORAGE_KEY]: readOptions() });
}

function setOptions(value: unknown): void {
  const source = value && typeof value === 'object' ? value as Partial<CheckoutOptions> : {};
  planSelect.value = source.planName === 'chatgptteamplan' ? 'chatgptteamplan' : 'chatgptplusplan';
  regionSelect.value = source.region === 'ID' || source.region === 'DE' || source.region === 'JP' ? source.region : 'US';
  workspaceInput.value = typeof source.workspaceName === 'string' ? source.workspaceName : 'MyTeam';
  seatsInput.value = String(typeof source.seatQuantity === 'number' ? source.seatQuantity : 5);
}

function isSupportedPaymentHost(hostname: string): boolean {
  return hostname === 'pay.openai.com' ||
    hostname === 'chatgpt.com' ||
    hostname === 'chat.openai.com' ||
    hostname.endsWith('paypal.com') ||
    hostname.endsWith('stripe.com') ||
    hostname.endsWith('stripe.com.cn');
}

function setStatus(message: string, type: 'pending' | 'ok' | 'error'): void {
  status.textContent = message;
  status.dataset.type = type;
}

function renderSteps(): void {
  setStep('source', mode === 'link' ? Boolean(linkInput.value.trim()) : Boolean(tokenInput.value.trim()));
  setStep('generate', Boolean(linkInput.value.trim()));
  setStep('open', false);
  setStep('pay', false);
  setStep('paypal', false);
}

function setStep(name: string, done: boolean): void {
  const item = steps.querySelector<HTMLElement>(`[data-step="${name}"]`);
  if (item) {
    item.dataset.done = done ? 'true' : 'false';
  }
}

function formatOpenError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (/incognito|无痕/i.test(message)) {
    return '请先在 chrome://extensions 为本扩展开启“允许在无痕模式下使用”';
  }
  return message;
}
