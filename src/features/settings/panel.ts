import { checkLatestVersion } from '../version-check/github';
import { loadAddressAutofillSettings, loadTempMailSettings, saveAddressAutofillSettings, saveTempMailSettings } from './state';

const TG_GROUP_URL = 'https://t.me/fuck_open';

export interface SettingsDialogOptions {
  onVersionChecked?: () => Promise<void> | void;
}

export interface SettingsDialogHandle {
  element: HTMLElement;
  open(): void;
  update(): Promise<void>;
}

export function createSettingsDialog(options: SettingsDialogOptions = {}): SettingsDialogHandle {
  const overlay = document.createElement('div');
  overlay.className = 'opx-settings-overlay';
  overlay.hidden = true;

  const dialog = document.createElement('section');
  dialog.className = 'opx-settings-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '插件设置');

  const header = document.createElement('div');
  header.className = 'opx-settings-header';
  const titleGroup = document.createElement('div');
  titleGroup.className = 'opx-settings-title';
  const title = document.createElement('strong');
  title.textContent = '设置';
  const version = document.createElement('span');
  version.className = 'opx-version-badge';
  version.textContent = `v${browser.runtime.getManifest().version}`;
  const closeButton = createIconButton('×', '关闭设置');
  titleGroup.append(title, version);
  header.append(titleGroup, closeButton);

  const payOpenAiCheckbox = document.createElement('input');
  payOpenAiCheckbox.type = 'checkbox';
  payOpenAiCheckbox.className = 'opx-checkbox';

  const payPalSignupCheckbox = document.createElement('input');
  payPalSignupCheckbox.type = 'checkbox';
  payPalSignupCheckbox.className = 'opx-checkbox';

  const payOpenAiItem = createSettingItem(
    payOpenAiCheckbox,
    'OpenAI 支付页自动填写',
    '用于 pay.openai.com/c/pay 页面，填写姓名、国家、地址、邮编、电话并勾选条款。',
  );
  const payPalSignupItem = createSettingItem(
    payPalSignupCheckbox,
    'PayPal 注册页自动填写',
    '用于 paypal.com/checkoutweb/signup 页面，填写国家、邮箱、卡资料、姓名、地址和密码提示。',
  );

  const tempMailTitle = document.createElement('div');
  tempMailTitle.className = 'opx-setting-section-title';
  tempMailTitle.textContent = '临时邮箱';
  const tempMailApiBaseInput = createTextInput('https://mail.example.com');
  const tempMailAdminAuthInput = createTextInput('admin_auth');
  tempMailAdminAuthInput.type = 'password';
  const tempMailDomainInput = createTextInput('example.com');
  const tempMailNameInput = createTextInput('留空则随机生成');
  const tempMailCustomAuthInput = createTextInput('可选');
  tempMailCustomAuthInput.type = 'password';
  const tempMailGrid = document.createElement('div');
  tempMailGrid.className = 'opx-grid';
  tempMailGrid.append(
    createInputField('Worker 地址', tempMailApiBaseInput),
    createInputField('admin_auth', tempMailAdminAuthInput),
    createInputField('邮箱域名', tempMailDomainInput),
    createInputField('邮箱名称', tempMailNameInput),
    createInputField('x-custom-auth', tempMailCustomAuthInput),
  );

  const checkUpdateButton = document.createElement('button');
  checkUpdateButton.className = 'opx-external-link-button';
  checkUpdateButton.type = 'button';
  checkUpdateButton.title = '立即检查 GitHub Release 最新版本';
  checkUpdateButton.textContent = '检测更新';

  const tgGroupButton = document.createElement('button');
  tgGroupButton.className = 'opx-external-link-button';
  tgGroupButton.type = 'button';
  tgGroupButton.title = '打开 TG 群组';
  tgGroupButton.append(createTelegramIcon(), document.createTextNode('TG 群组：t.me/fuck_open'));

  const hint = document.createElement('div');
  hint.className = 'opx-hint';
  hint.textContent = '国家、城市和获取地址在“地址”tab 中操作。';

  const status = document.createElement('div');
  status.className = 'opx-status';

  dialog.append(header, payOpenAiItem, payPalSignupItem, tempMailTitle, tempMailGrid, checkUpdateButton, tgGroupButton, hint, status);
  overlay.append(dialog);

  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  payOpenAiCheckbox.addEventListener('change', async () => {
    await saveAddressAutofillSettings({ payOpenAiEnabled: payOpenAiCheckbox.checked });
    setStatus(status, '设置已保存', 'ok');
  });
  payPalSignupCheckbox.addEventListener('change', async () => {
    await saveAddressAutofillSettings({ payPalSignupEnabled: payPalSignupCheckbox.checked });
    setStatus(status, '设置已保存', 'ok');
  });
  for (const input of [tempMailApiBaseInput, tempMailAdminAuthInput, tempMailDomainInput, tempMailNameInput, tempMailCustomAuthInput]) {
    input.addEventListener('change', () => void saveTempMailInputs());
    input.addEventListener('blur', () => void saveTempMailInputs());
  }
  tgGroupButton.addEventListener('click', () => {
    window.open(TG_GROUP_URL, '_blank', 'noopener,noreferrer');
  });
  checkUpdateButton.addEventListener('click', async () => {
    checkUpdateButton.disabled = true;
    setStatus(status, '正在检测 GitHub 最新版本...', 'pending');
    try {
      const result = await checkLatestVersion(true);
      await options.onVersionChecked?.();
      if (result.latest && result.updateAvailable) {
        setStatus(status, `发现新版本 v${result.latest.version}，顶部已显示更新提示`, 'ok');
      } else if (result.latest) {
        setStatus(status, `当前已是最新版本 v${result.currentVersion}`, 'ok');
      } else {
        setStatus(status, result.error || '暂未找到可用 Release', 'pending');
      }
    } catch (error) {
      setStatus(status, error instanceof Error ? error.message : String(error), 'error');
    } finally {
      checkUpdateButton.disabled = false;
    }
  });

  const update = async () => {
    const settings = await loadAddressAutofillSettings();
    const tempMail = await loadTempMailSettings();
    payOpenAiCheckbox.checked = settings.payOpenAiEnabled;
    payPalSignupCheckbox.checked = settings.payPalSignupEnabled;
    tempMailApiBaseInput.value = tempMail.apiBase;
    tempMailAdminAuthInput.value = tempMail.adminAuth;
    tempMailDomainInput.value = tempMail.domain;
    tempMailNameInput.value = tempMail.mailboxName;
    tempMailCustomAuthInput.value = tempMail.customAuth;
    const enabledCount = Number(settings.payOpenAiEnabled) + Number(settings.payPalSignupEnabled);
    const tempMailReady = Boolean(tempMail.apiBase && tempMail.adminAuth && tempMail.domain);
    setStatus(
      status,
      tempMailReady ? `临时邮箱已配置 · 已开启 ${enabledCount} 项自动填写` : '请先配置临时邮箱 Worker、admin_auth 和域名',
      tempMailReady ? 'ok' : 'pending',
    );
  };

  return {
    element: overlay,
    open: () => {
      overlay.hidden = false;
      void update();
    },
    update,
  };

  function close(): void {
    overlay.hidden = true;
  }

  async function saveTempMailInputs(): Promise<void> {
    await saveTempMailSettings({
      apiBase: tempMailApiBaseInput.value,
      adminAuth: tempMailAdminAuthInput.value,
      domain: tempMailDomainInput.value,
      mailboxName: tempMailNameInput.value,
      customAuth: tempMailCustomAuthInput.value,
    });
    setStatus(status, '临时邮箱设置已保存', 'ok');
  }
}

function createSettingItem(checkbox: HTMLInputElement, title: string, description: string): HTMLElement {
  const item = document.createElement('div');
  item.className = 'opx-setting-item';

  const label = document.createElement('label');
  label.className = 'opx-check-row';
  const titleElement = document.createElement('span');
  titleElement.textContent = title;
  label.append(checkbox, titleElement);

  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'opx-setting-description';
  descriptionElement.textContent = description;

  item.append(label, descriptionElement);
  return item;
}

function createTextInput(placeholder: string): HTMLInputElement {
  const input = document.createElement('input');
  input.className = 'opx-input';
  input.type = 'text';
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  input.spellcheck = false;
  return input;
}

function createInputField(labelText: string, input: HTMLInputElement): HTMLElement {
  const label = document.createElement('label');
  label.className = 'opx-field';
  const span = document.createElement('span');
  span.textContent = labelText;
  label.append(span, input);
  return label;
}

function createTelegramIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('opx-telegram-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M21.9 4.3 18.7 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7.1 12.9 2.6 11.5c-1-.3-1-1 0-1.4L20.2 3.3c.8-.3 1.5.2 1.7 1Z');
  svg.append(path);
  return svg;
}

function createIconButton(label: string, title: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'opx-icon-button';
  button.type = 'button';
  button.textContent = label;
  button.title = title;
  button.setAttribute('aria-label', title);
  return button;
}

function setStatus(element: HTMLElement, message: string, type: 'pending' | 'ok' | 'error'): void {
  element.textContent = message;
  element.dataset.type = type;
}
