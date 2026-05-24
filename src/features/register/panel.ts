import type { FeaturePanelHandle } from '../../app/types';
import type { RegisterController } from './types';

export function createRegisterPanel(container: HTMLElement, controller: RegisterController): FeaturePanelHandle {
  const inputHint = document.createElement('div');
  inputHint.className = 'opx-hint';
  inputHint.textContent = '点击按钮会自动创建临时邮箱并填入当前注册页。';

  const emailButton = createButton('生成邮箱并继续');
  const otp = document.createElement('input');
  otp.className = 'opx-input';
  otp.type = 'text';
  otp.inputMode = 'numeric';
  otp.placeholder = '验证码';
  otp.autocomplete = 'one-time-code';

  const otpButton = createButton('填入验证码并继续');
  const autoOtpButton = createButton('自动接收并填入验证码', 'opx-button opx-button-secondary');
  const profileButton = createButton('填写资料并创建');

  const status = document.createElement('div');
  status.className = 'opx-status';
  status.textContent = '等待操作';

  const update = async () => {
    const page = controller.getPageState();
    const saved = await controller.loadState();
    emailButton.disabled = !page.canFillEmail;
    otpButton.disabled = !page.canFillOtp;
    autoOtpButton.disabled = !page.canFillOtp || !saved.autoOtp;
    profileButton.disabled = !page.canFillProfile;
    inputHint.textContent = saved.email
      ? `当前临时邮箱：${saved.email}`
      : '点击按钮会自动创建临时邮箱并填入当前注册页。';
  };

  emailButton.addEventListener('click', async () => {
    setStatus(status, '正在生成临时邮箱...', 'pending');
    setResult(status, await controller.fillEmailFromInput());
    await update();
  });

  otpButton.addEventListener('click', async () => {
    setStatus(status, '正在提交验证码...', 'pending');
    setResult(status, await controller.fillOtp(otp.value));
    await update();
  });

  autoOtpButton.addEventListener('click', async () => {
    setStatus(status, '等待临时邮箱验证码...', 'pending');
    setResult(status, await controller.waitForOutlookOtp());
    await update();
  });

  profileButton.addEventListener('click', async () => {
    setStatus(status, '正在填写资料...', 'pending');
    setResult(status, await controller.fillProfileAndCreate());
    await update();
  });

  container.append(inputHint, emailButton, otp, otpButton, autoOtpButton, profileButton, status);
  void update();
  return { update };
}

function createButton(label: string, className = 'opx-button'): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.type = 'button';
  button.textContent = label;
  return button;
}

function setResult(element: HTMLElement, result: { ok: boolean; message: string }): void {
  setStatus(element, result.message, result.ok ? 'ok' : 'error');
}

function setStatus(element: HTMLElement, message: string, type: 'pending' | 'ok' | 'error'): void {
  element.textContent = message;
  element.dataset.type = type;
}
