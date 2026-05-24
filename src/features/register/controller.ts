import { fillEmailAndContinue, isChatGptLoginPage } from './chatgpt-auth-page';
import { fillOtpAndContinue, isEmailVerificationPage } from './openai-email-verification-page';
import { fillAboutYouAndCreate, isAboutYouPage } from './openai-about-you-page';
import { parseAccountInput } from './account-input';
import { loadRegisterState, saveRegisterState } from '../../app/state';
import { loadTempMailSettings } from '../settings/state';
import type { ActionResult, PageState, RegisterController } from './types';

let autoProfileStarted = false;

export function createRegisterController(): RegisterController {
  return {
    getPageState,
    loadState: loadRegisterState,
    saveInput: async (rawInput: string) => {
      const parsed = parseAccountInput(rawInput);
      return saveRegisterState({
        rawInput,
        email: parsed.email,
        accountLine: parsed.accountLine,
        apiBase: parsed.apiBase,
        inputMode: parsed.mode,
        autoOtp: parsed.mode === 'outlook-line',
      });
    },
    fillEmailFromInput: async () => {
      if (!isChatGptLoginPage()) {
        return fail('当前页面不是 ChatGPT 登录页');
      }

      const settings = await loadTempMailSettings();
      const accountLineRequest = createTempMailRequestLine(settings);
      if (!accountLineRequest.ok) {
        return fail(accountLineRequest.message);
      }

      const response = await browser.runtime.sendMessage({
        type: 'opx:create-temp-mail-address',
        accountLine: accountLineRequest.accountLine,
      });
      if (!isTempMailAddressResult(response) || !response.ok || !response.email || !response.accountLine) {
        return fail(response?.message || '临时邮箱 API 没有返回有效地址');
      }
      const email = response.email;
      const accountLine = response.accountLine;
      await saveRegisterState({
        rawInput: accountLine,
        email,
        accountLine,
        apiBase: settings.apiBase,
        inputMode: 'outlook-line',
        autoOtp: true,
        otpRequestedAt: Date.now(),
      });
      return fillEmailAndContinue(email);
    },
    fillOtp: async (code: string) => {
      if (!isEmailVerificationPage()) {
        return fail('当前页面不是邮箱验证码页');
      }
      return fillOtpAndContinue(code);
    },
    waitForOutlookOtp: async () => {
      if (!isEmailVerificationPage()) {
        return fail('当前页面不是邮箱验证码页');
      }
      const state = await loadRegisterState();
      if (!state.accountLine) {
        return fail('当前输入不是临时邮箱账号行，不能自动接收验证码');
      }

      const response = await browser.runtime.sendMessage({
        type: 'opx:wait-outlook-otp',
        accountLine: state.accountLine,
        apiBase: state.apiBase,
        since: state.otpRequestedAt || state.updatedAt || Date.now(),
        timeoutMs: 180_000,
        intervalMs: 5_000,
      });

      if (!isActionResult(response)) {
        return fail('临时邮箱 API 没有返回有效结果');
      }

      if (!response.ok || !response.code) {
        return response;
      }

      const fillResult = await fillOtpAndContinue(response.code);
      return {
        ...fillResult,
        code: response.code,
        message: fillResult.ok ? `已收到并提交验证码：${response.code}` : fillResult.message,
      };
    },
    fillProfileAndCreate: async () => {
      if (!isAboutYouPage()) {
        return fail('当前页面不是资料填写页');
      }
      return fillAboutYouAndCreate();
    },
    autoRunForCurrentPage: async () => {
      if (!isAboutYouPage() || autoProfileStarted) {
        return;
      }
      autoProfileStarted = true;
      await waitForPageReady();
      await fillAboutYouAndCreate();
    },
  };
}

function getPageState(): PageState {
  if (isChatGptLoginPage()) {
    return {
      kind: 'login',
      label: 'ChatGPT 登录页',
      canFillEmail: true,
      canFillOtp: false,
      canFillProfile: false,
    };
  }

  if (isEmailVerificationPage()) {
    return {
      kind: 'email-verification',
      label: '邮箱验证码页',
      canFillEmail: false,
      canFillOtp: true,
      canFillProfile: false,
    };
  }

  if (isAboutYouPage()) {
    return {
      kind: 'about-you',
      label: '资料填写页',
      canFillEmail: false,
      canFillOtp: false,
      canFillProfile: true,
    };
  }

  return {
    kind: 'unknown',
    label: '未识别页面',
    canFillEmail: false,
    canFillOtp: false,
    canFillProfile: false,
  };
}

function createTempMailRequestLine(settings: {
  apiBase: string;
  adminAuth: string;
  domain: string;
  mailboxName: string;
  customAuth: string;
}): { ok: true; accountLine: string } | { ok: false; message: string } {
  if (!settings.apiBase || !settings.adminAuth || !settings.domain) {
    return {
      ok: false,
      message: '请先在设置里填写临时邮箱 Worker 地址、admin_auth 和邮箱域名',
    };
  }
  return {
    ok: true,
    accountLine: [
      settings.apiBase,
      settings.adminAuth,
      settings.domain,
      settings.mailboxName,
      settings.customAuth,
    ].filter(Boolean).join('----'),
  };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

function isActionResult(value: unknown): value is ActionResult {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as ActionResult).ok === 'boolean' &&
      typeof (value as ActionResult).message === 'string',
  );
}

function isTempMailAddressResult(value: unknown): value is ActionResult & { email?: string; accountLine?: string } {
  return isActionResult(value);
}

function waitForPageReady(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, 800));
}
