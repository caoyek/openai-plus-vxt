import { fetchRandomAddress } from '../src/features/address-autofill/address-source';
import type { RandomAddressMessage } from '../src/features/address-autofill/types';
import { createCheckoutLink } from '../src/features/link-extractor/checkout';
import { fetchChatGptSession } from '../src/features/link-extractor/session';
import type { ChatGptSessionMessage, ChatGptSessionResponse, CheckoutLinkMessage } from '../src/features/link-extractor/types';
import type { OutlookOtpMessage, OutlookOtpResponse, TempMailAddressMessage } from '../src/features/register/types';
import type { SmsRelayFetchMessage, SmsRelayFetchResponse } from '../src/features/sms/types';

type MessageSenderLike = {
  tab?: {
    id?: number;
  };
};

type ExternalPayLinkMessage = {
  type: 'opx:run-pay-link';
  pay?: string;
  url?: string;
  link?: string;
  paymentLink?: string;
  incognito?: boolean;
};

const DEFAULT_TIMEOUT_MS = 180_000;
const DEFAULT_INTERVAL_MS = 5_000;
const ASSISTANT_SCRIPT_FILE = '/content-scripts/content.js';
const ASSISTANT_URL_PREFIXES = [
  'https://chatgpt.com/',
  'https://chat.openai.com/',
  'https://auth.openai.com/',
  'https://pay.openai.com/',
  'https://www.paypal.com/',
  'https://paypal.com/',
];

export default defineBackground(() => {
  installAssistantInjector();

  browser.runtime.onMessageExternal.addListener((message: unknown) => {
    if (isExternalPayLinkMessage(message)) {
      return openExternalPayLink(message);
    }
    return undefined;
  });

  browser.runtime.onMessage.addListener((message: unknown, sender) => {
    if (!isOutlookOtpMessage(message)) {
      if (isExternalPayLinkMessage(message)) {
        return openExternalPayLink(message);
      }
      if (isCheckoutLinkMessage(message)) {
        return createCheckoutLink(message.raw, message.options);
      }
      if (isChatGptSessionMessage(message)) {
        return fetchChatGptSessionForSender(sender);
      }
      if (isRandomAddressMessage(message)) {
        return fetchRandomAddress(message.countryCode, message.city);
      }
      if (isSmsRelayFetchMessage(message)) {
        return fetchSmsRelay(message.url);
      }
      if (isTempMailAddressMessage(message)) {
        return createTempMailAddress(message.accountLine);
      }
      return undefined;
    }

    return waitForOutlookOtp(message);
  });
});

async function openExternalPayLink(message: ExternalPayLinkMessage): Promise<{ ok: boolean; message: string; url?: string }> {
  const raw = message.pay || message.url || message.link || message.paymentLink || '';
  const normalized = normalizePaymentUrl(raw);
  if (!normalized.ok) {
    return normalized;
  }

  try {
    if (message.incognito) {
      await browser.windows.create({ url: normalized.url, incognito: true, focused: true });
    } else {
      await browser.tabs.create({ url: normalized.url, active: true });
    }
    return {
      ok: true,
      message: '已打开支付长链',
      url: normalized.url,
    };
  } catch (error) {
    return {
      ok: false,
      message: `打开支付长链失败：${String(error)}`,
    };
  }
}

async function fetchChatGptSessionForSender(sender: MessageSenderLike): Promise<ChatGptSessionResponse> {
  const tabId = sender.tab?.id;
  if (typeof tabId !== 'number') {
    return fetchChatGptSession();
  }

  try {
    const results = await browser.scripting.executeScript({
      target: { tabId },
      func: fetchChatGptSessionInTab,
    });
    const response = results[0]?.result;
    if (isChatGptSessionResponse(response)) {
      return response;
    }
    return {
      ok: false,
      message: '当前标签页返回的 ChatGPT session 结果无效',
    };
  } catch (error) {
    return {
      ok: false,
      message: `无法在当前标签页读取 ChatGPT session：${String(error)}`,
    };
  }
}

async function fetchChatGptSessionInTab(): Promise<ChatGptSessionResponse> {
  const sessionUrl = 'https://chatgpt.com/api/auth/session';
  let response: Response;
  try {
    response = await fetch(sessionUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'include',
      cache: 'no-store',
    });
  } catch (error) {
    return fail(`无法请求 ChatGPT session：${String(error)}`);
  }

  const text = await response.text();
  const data = parseJson(text);
  if (!response.ok) {
    return fail(`ChatGPT session HTTP ${response.status}：${shorten(text || response.statusText)}`);
  }

  if (!isRecord(data)) {
    return fail('ChatGPT session 响应不是 JSON 对象');
  }

  const session = extractSessionInfo(data);
  if (!session.accessToken) {
    return {
      ok: false,
      message: session.email ? '已读取账号信息，但 session 内没有 accessToken' : '未读取到登录 session',
      session,
    };
  }

  return {
    ok: true,
    message: '已从当前标签页读取 ChatGPT session',
    session,
  };

  function extractSessionInfo(data: Record<string, unknown>) {
    const user = isRecord(data.user) ? data.user : {};
    const account = isRecord(data.account) ? data.account : {};
    return {
      email: stringValue(user.email),
      planType: stringValue(account.planType) || stringValue(account.plan_type),
      accessToken: stringValue(data.accessToken),
      fetchedAt: Date.now(),
    };
  }

  function parseJson(text: string): unknown {
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  }

  function stringValue(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  function fail(message: string) {
    return { ok: false, message };
  }

  function shorten(text: string, limit = 400): string {
    return String(text || '').replace(/\s+/g, ' ').slice(0, limit);
  }

  function isRecord(value: unknown): value is Record<string, unknown> {
    return Boolean(value && typeof value === 'object');
  }
}

function installAssistantInjector(): void {
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete' || !isAssistantUrl(tab.url)) {
      return;
    }
    setTimeout(() => void injectAssistant(tabId), 300);
  });

  void browser.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
      if (typeof tab.id === 'number' && isAssistantUrl(tab.url)) {
        void injectAssistant(tab.id);
      }
    }
  }).catch((error) => {
    console.debug('[OPX] initial assistant injection skipped', error);
  });
}

async function injectAssistant(tabId: number): Promise<void> {
  try {
    await browser.scripting.executeScript({
      target: { tabId },
      files: [ASSISTANT_SCRIPT_FILE],
    });
  } catch (error) {
    console.debug('[OPX] assistant injection skipped', { tabId, error });
  }
}

function isAssistantUrl(url: string | undefined): boolean {
  return ASSISTANT_URL_PREFIXES.some((prefix) => url?.startsWith(prefix));
}

function isExternalPayLinkMessage(value: unknown): value is ExternalPayLinkMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const message = value as Partial<ExternalPayLinkMessage>;
  return message.type === 'opx:run-pay-link' &&
    typeof (message.pay || message.url || message.link || message.paymentLink || '') === 'string';
}

function normalizePaymentUrl(raw: string): { ok: true; url: string } | { ok: false; message: string } {
  if (!raw.trim()) {
    return { ok: false, message: '缺少支付长链参数' };
  }
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== 'https:') {
      return { ok: false, message: '支付链接必须是 https 地址' };
    }
    if (!isSupportedPaymentHost(url.hostname)) {
      return { ok: false, message: '只支持 OpenAI / ChatGPT / PayPal / Stripe 支付链接' };
    }
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, message: '支付链接格式无效' };
  }
}

function isSupportedPaymentHost(hostname: string): boolean {
  return hostname === 'pay.openai.com' ||
    hostname === 'chatgpt.com' ||
    hostname === 'chat.openai.com' ||
    hostname.endsWith('paypal.com') ||
    hostname.endsWith('stripe.com') ||
    hostname.endsWith('stripe.com.cn');
}

async function waitForOutlookOtp(message: OutlookOtpMessage): Promise<OutlookOtpResponse> {
  const startedAt = message.since ?? Date.now();
  const deadline = Date.now() + (message.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const intervalMs = message.intervalMs ?? DEFAULT_INTERVAL_MS;
  const account = parseTempMailAccountLine(message.accountLine);
  if (!account.ok) {
    return {
      ok: false,
      message: account.message,
    };
  }

  while (Date.now() <= deadline) {
    const result = await fetchLatestTempMailOtp(account, startedAt);
    if (result.ok && result.code) {
      return result;
    }
    if (!result.ok && result.fatal) {
      return result;
    }
    await delay(intervalMs);
  }

  return {
    ok: false,
    message: '等待临时邮箱验证码超时',
  };
}

async function fetchLatestTempMailOtp(
  account: TempMailAccount,
  startedAt: number,
): Promise<OutlookOtpResponse & { fatal?: boolean }> {
  let response: Response;
  try {
    response = await fetch(`${account.apiBase}/api/mails?limit=10&offset=0`, {
      method: 'GET',
      headers: tempMailAuthHeaders(account),
      cache: 'no-store',
    });
  } catch (error) {
    return {
      ok: false,
      fatal: true,
      message: `无法连接临时邮箱 API：${String(error)}`,
    };
  }

  if (!response.ok) {
    const detail = await readResponseDetail(response);
    return {
      ok: false,
      fatal: true,
      message: `临时邮箱 API 返回 ${response.status}：${detail}`,
    };
  }

  const payload = await response.json();
  const messages = extractTempMailMessages(payload)
    .map(normalizeTempMailMessage)
    .sort((a, b) => b.receivedAt - a.receivedAt);

  const fresh = messages.find((item) => {
    if (!item.code) {
      return false;
    }
    return !item.receivedAt || item.receivedAt >= startedAt - 15_000;
  });

  if (!fresh?.code) {
    return {
      ok: false,
      message: '暂未收到新的临时邮箱验证码',
    };
  }

  return {
    ok: true,
    code: fresh.code,
    message: `收到验证码：${fresh.code}`,
  };
}

async function createTempMailAddress(accountLine: string): Promise<OutlookOtpResponse> {
  const request = parseTempMailNewAddressLine(accountLine);
  if (!request.ok) {
    return {
      ok: false,
      message: request.message,
    };
  }

  let response: Response;
  try {
    response = await fetch(`${request.apiBase}/admin/new_address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-auth': request.adminAuth,
        ...(request.customAuth ? { 'x-custom-auth': request.customAuth } : {}),
      },
      body: JSON.stringify({
        enablePrefix: true,
        name: request.name || randomMailboxName(),
        domain: request.domain,
      }),
    });
  } catch (error) {
    return {
      ok: false,
      message: `无法连接临时邮箱创建接口：${String(error)}`,
    };
  }

  if (!response.ok) {
    const detail = await readResponseDetail(response);
    return {
      ok: false,
      message: `临时邮箱创建接口返回 ${response.status}：${detail}`,
    };
  }

  const payload = await response.json() as TempMailNewAddressPayload;
  const email = String(payload.address || '').trim();
  const jwt = String(payload.jwt || '').trim();
  if (!email || !jwt) {
    return {
      ok: false,
      message: '临时邮箱创建接口没有返回 address/jwt',
    };
  }

  const accountLineOut = [
    email,
    jwt,
    request.apiBase,
    request.customAuth,
  ].filter(Boolean).join('----');
  return {
    ok: true,
    email,
    accountLine: accountLineOut,
    message: `已创建临时邮箱：${email}`,
  };
}

function isOutlookOtpMessage(message: unknown): message is OutlookOtpMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (message as OutlookOtpMessage).type === 'opx:wait-outlook-otp' &&
      typeof (message as OutlookOtpMessage).accountLine === 'string',
  );
}

function isTempMailAddressMessage(message: unknown): message is TempMailAddressMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (message as TempMailAddressMessage).type === 'opx:create-temp-mail-address' &&
      typeof (message as TempMailAddressMessage).accountLine === 'string',
  );
}

function isCheckoutLinkMessage(message: unknown): message is CheckoutLinkMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (message as CheckoutLinkMessage).type === 'opx:create-checkout-link' &&
      typeof (message as CheckoutLinkMessage).raw === 'string' &&
      typeof (message as CheckoutLinkMessage).options === 'object',
  );
}

function isChatGptSessionMessage(message: unknown): message is ChatGptSessionMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (message as ChatGptSessionMessage).type === 'opx:fetch-chatgpt-session',
  );
}

function isChatGptSessionResponse(value: unknown): value is ChatGptSessionResponse {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as ChatGptSessionResponse).ok === 'boolean' &&
      typeof (value as ChatGptSessionResponse).message === 'string',
  );
}

function isRandomAddressMessage(message: unknown): message is RandomAddressMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (
        (message as RandomAddressMessage).type === 'opx:fetch-random-address' ||
        (message as RandomAddressMessage).type === 'opx:fetch-random-us-address'
      ),
  );
}

function isSmsRelayFetchMessage(message: unknown): message is SmsRelayFetchMessage {
  return Boolean(
    message &&
      typeof message === 'object' &&
      (message as SmsRelayFetchMessage).type === 'opx:fetch-sms-relay' &&
      typeof (message as SmsRelayFetchMessage).url === 'string',
  );
}

async function fetchSmsRelay(url: string): Promise<SmsRelayFetchResponse> {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return {
        ok: false,
        message: '接码 API 只支持 http/https 链接',
      };
    }
  } catch {
    return {
      ok: false,
      message: '接码 API 链接格式无效',
    };
  }

  let response: Response;
  try {
    response = await fetch(parsedUrl.toString(), {
      method: 'GET',
      cache: 'no-store',
    });
  } catch (error) {
    return {
      ok: false,
      message: `接码 API 请求失败：${String(error)}`,
    };
  }

  const status = response.status;
  const { parsed: detail, text } = await readSmsRelayResponse(response);
  if (!response.ok) {
    return {
      ok: false,
      status,
      message: `接码 API 返回 ${status}：${text || response.statusText}`,
      text,
      raw: detail,
    };
  }

  if (isRecord(detail)) {
    const data = String(detail.data || '').trim();
    const message = String(detail.msg || detail.message || 'OK');
    return {
      ok: isSmsRelaySuccessPayload(detail),
      status,
      message,
      data,
      text,
      raw: detail,
    };
  }

  return {
    ok: true,
    status,
    message: 'OK',
    data: String(detail || '').trim(),
    text,
    raw: detail,
  };
}

async function readSmsRelayResponse(response: Response): Promise<{ parsed: unknown; text: string }> {
  const text = await response.text();
  if (!text) {
    return { parsed: '', text: '' };
  }
  try {
    return { parsed: JSON.parse(text), text };
  } catch {
    return { parsed: text, text };
  }
}

async function readResponseDetail(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text) {
      return response.statusText;
    }
    try {
      const data = JSON.parse(text) as { detail?: string; message?: string; error?: string };
      return data.detail || data.message || data.error || shortenDetail(text);
    } catch {
      return shortenDetail(text);
    }
  } catch {
    return response.statusText;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object');
}

function shortenDetail(text: string, limit = 400): string {
  return String(text || '').replace(/\s+/g, ' ').slice(0, limit);
}

function isSmsRelaySuccessPayload(value: Record<string, unknown>): boolean {
  if (typeof value.success === 'boolean') {
    return value.success;
  }
  if (typeof value.ok === 'boolean') {
    return value.ok;
  }

  const codeValue = value.code ?? value.status ?? value.statusCode;
  if (codeValue === undefined || codeValue === null || codeValue === '') {
    return true;
  }

  const code = Number(codeValue);
  if (Number.isNaN(code)) {
    return true;
  }
  return code === 0 || code === 1 || code === 200;
}

function parseTempMailAccountLine(accountLine: string): TempMailAccountParseResult {
  const parts = accountLine.split('----').map((item) => item.trim());
  if (parts.length < 3) {
    return { ok: false, message: '临时邮箱账号行需要 email----地址JWT----Worker地址' };
  }
  const email = parts[0];
  const jwt = parts[1];
  const apiBase = normalizeTempMailApiBase(parts[2]);
  if (!email || !jwt || !apiBase) {
    return { ok: false, message: '临时邮箱账号行缺少邮箱、地址 JWT 或 Worker 地址' };
  }
  return {
    ok: true,
    email,
    jwt,
    apiBase,
    customAuth: parts[3] || '',
  };
}

function parseTempMailNewAddressLine(accountLine: string): TempMailNewAddressParseResult {
  const parts = accountLine.split('----').map((item) => item.trim());
  const apiBase = normalizeTempMailApiBase(parts[0] || '');
  if (!apiBase || parts.length < 3 || !parts[1] || !parts[2]) {
    return { ok: false, message: '新建临时邮箱需要 Worker地址----admin_auth----邮箱域名' };
  }
  return {
    ok: true,
    apiBase,
    adminAuth: parts[1],
    domain: parts[2],
    name: parts[3] || '',
    customAuth: parts[4] || '',
  };
}

function normalizeTempMailApiBase(value: string): string {
  try {
    const url = new URL(value.replace(/\/+$/, ''));
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }
    return url.toString().replace(/\/+$/, '');
  } catch {
    return '';
  }
}

function tempMailAuthHeaders(account: TempMailAccount): Record<string, string> {
  return {
    Authorization: `Bearer ${account.jwt}`,
    'Content-Type': 'application/json',
    ...(account.customAuth ? { 'x-custom-auth': account.customAuth } : {}),
  };
}

function extractTempMailMessages(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (!isRecord(payload)) {
    return [];
  }
  for (const key of ['mails', 'messages', 'data', 'items', 'results']) {
    const value = payload[key];
    if (Array.isArray(value)) {
      return value;
    }
    if (isRecord(value)) {
      const nested = extractTempMailMessages(value);
      if (nested.length) {
        return nested;
      }
    }
  }
  return [];
}

function normalizeTempMailMessage(value: unknown): NormalizedTempMailMessage {
  const source = isRecord(value) ? value : {};
  const text = collectMailText(source);
  return {
    code: extractOpenAiOtp(text),
    receivedAt: extractMailReceivedAt(source, text),
  };
}

function collectMailText(source: Record<string, unknown>): string {
  const chunks = [
    stringValueFromRecord(source, 'subject'),
    stringValueFromRecord(source, 'from'),
    stringValueFromRecord(source, 'to'),
    stringValueFromRecord(source, 'text'),
    stringValueFromRecord(source, 'html'),
    stringValueFromRecord(source, 'body'),
    stringValueFromRecord(source, 'content'),
    stringValueFromRecord(source, 'source'),
    stringValueFromRecord(source, 'raw'),
  ];
  const raw = chunks.join('\n');
  return [
    raw,
    decodeQuotedPrintable(raw),
    ...decodeBase64MailParts(raw),
  ].join('\n');
}

function extractMailReceivedAt(source: Record<string, unknown>, text: string): number {
  for (const key of ['received_at', 'receivedAt', 'created_at', 'createdAt', 'date', 'time', 'timestamp']) {
    const value = source[key];
    const parsed = parseMailTimestamp(value);
    if (parsed) {
      return parsed;
    }
  }

  const dateHeader = /^date:\s*(.+)$/im.exec(text);
  return dateHeader?.[1] ? parseMailTimestamp(dateHeader[1]) : 0;
}

function parseMailTimestamp(value: unknown): number {
  if (typeof value === 'number') {
    return value > 1_000_000_000_000 ? value : value * 1000;
  }
  if (typeof value !== 'string' || !value.trim()) {
    return 0;
  }
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return parseMailTimestamp(numeric);
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractOpenAiOtp(text: string): string {
  const normalized = text.replace(/=\r?\n/g, '').replace(/\s+/g, ' ');
  const openAiWindow = /(openai|chatgpt|verify|verification|验证码|安全代码).{0,180}?(\d{4,8})/i.exec(normalized);
  if (openAiWindow?.[2]) {
    return openAiWindow[2];
  }
  const generic = /\b\d{4,8}\b/.exec(normalized);
  return generic?.[0] || '';
}

function decodeQuotedPrintable(value: string): string {
  return value
    .replace(/=\r?\n/g, '')
    .replace(/=([0-9A-F]{2})/gi, (_, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
}

function decodeBase64MailParts(value: string): string[] {
  const decoded: string[] = [];
  const base64Blocks = value.match(/(?:[A-Za-z0-9+/]{40,}={0,2}\r?\n?){1,}/g) || [];
  for (const block of base64Blocks.slice(0, 10)) {
    const compact = block.replace(/\s+/g, '');
    try {
      decoded.push(decodeURIComponent(escape(atob(compact))));
    } catch {
      try {
        decoded.push(atob(compact));
      } catch {
        // Ignore non-body base64 fragments.
      }
    }
  }
  return decoded;
}

function stringValueFromRecord(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === 'string' ? value : '';
}

function randomMailboxName(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  const digits = String(Math.floor(1000 + Math.random() * 9000));
  return `${letters}${digits}`;
}

type TempMailAccountParseResult =
  | (TempMailAccount & { ok: true })
  | { ok: false; message: string };

interface TempMailAccount {
  email: string;
  jwt: string;
  apiBase: string;
  customAuth: string;
}

type TempMailNewAddressParseResult =
  | (TempMailNewAddressRequest & { ok: true })
  | { ok: false; message: string };

interface TempMailNewAddressRequest {
  apiBase: string;
  adminAuth: string;
  domain: string;
  name: string;
  customAuth: string;
}

interface TempMailNewAddressPayload {
  jwt?: string;
  address?: string;
  address_id?: number;
}

interface NormalizedTempMailMessage {
  code: string;
  receivedAt: number;
}
