import type { ParsedAccountInput } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_RE = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export function parseAccountInput(rawInput: string): ParsedAccountInput {
  const raw = rawInput.trim();
  if (!raw) {
    return invalid('empty', '请输入邮箱或临时邮箱账号行');
  }

  const firstLine = raw.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || '';
  if (firstLine.includes('----')) {
    const parts = firstLine.split('----').map((item) => item.trim());
    const first = parts[0] || '';
    if (isHttpUrl(first)) {
      if (parts.length < 3 || !parts[1] || !parts[2]) {
        return invalid('invalid', '新建临时邮箱需要 Worker地址----admin_auth----邮箱域名');
      }
      return {
        ok: true,
        mode: 'outlook-line',
        email: '',
        accountLine: firstLine,
        apiBase: normalizeApiBase(first),
        message: '临时邮箱 API 新建地址并自动收码',
      };
    }

    const email = first;
    if (!EMAIL_RE.test(email)) {
      return invalid('invalid', '临时邮箱行里的邮箱格式不正确');
    }
    if (parts.length < 3 || !JWT_RE.test(parts[1]) || !isHttpUrl(parts[2])) {
      return invalid('invalid', '已有临时邮箱需要 email----地址JWT----Worker地址');
    }
    return {
      ok: true,
      mode: 'outlook-line',
      email,
      accountLine: firstLine,
      apiBase: normalizeApiBase(parts[2]),
      message: '临时邮箱 API 自动验证码',
    };
  }

  if (!EMAIL_RE.test(firstLine)) {
    return invalid('invalid', '邮箱格式不正确');
  }

  return {
    ok: true,
    mode: 'email',
    email: firstLine,
    accountLine: '',
    message: '单邮箱模式，验证码手动输入',
  };
}

function invalid(mode: ParsedAccountInput['mode'], message: string): ParsedAccountInput {
  return {
    ok: false,
    mode,
    email: '',
    accountLine: '',
    message,
  };
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeApiBase(value: string): string {
  return value.replace(/\/+$/, '');
}
