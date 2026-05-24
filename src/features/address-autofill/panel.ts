import type { FeaturePanelHandle } from '../../app/types';
import { loadAddressAutofillSettings, saveAddressAutofillSettings } from '../settings/state';
import type { AddressAutofillSettings } from '../settings/types';
import { ADDRESS_COUNTRY_OPTIONS } from './address-source';
import { fillPayOpenAiAddressNow } from './pay-openai-autofill';
import { fillPaypalAddressNow } from './paypal-autofill';
import type { AddressProfile, RandomAddressResponse } from './types';

export function createAddressPanel(container: HTMLElement): FeaturePanelHandle {
  const summary = document.createElement('div');
  summary.className = 'opx-summary';

  const countrySelect = createCountrySelect();
  const cityInput = document.createElement('input');
  cityInput.className = 'opx-input';
  cityInput.type = 'text';
  cityInput.placeholder = '城市留空即随机，例如 Tokyo / Berlin / New York';
  cityInput.autocomplete = 'off';

  const formGrid = document.createElement('div');
  formGrid.className = 'opx-grid';
  formGrid.append(
    createField('地址国家', countrySelect),
    createField('指定城市', cityInput),
  );

  const buttonRow = document.createElement('div');
  buttonRow.className = 'opx-button-row opx-address-actions';
  const fetchButton = createButton('获取地址');
  buttonRow.append(fetchButton);

  const currentList = document.createElement('div');
  currentList.className = 'opx-copy-list';

  const status = document.createElement('div');
  status.className = 'opx-status';

  container.append(
    summary,
    formGrid,
    buttonRow,
    currentList,
    status,
  );

  countrySelect.addEventListener('change', () => void saveScopeSettings('国家已保存'));
  cityInput.addEventListener('change', () => void saveScopeSettings('城市已保存'));
  fetchButton.addEventListener('click', () => void fetchAddress());

  const update = async () => {
    const settings = await loadAddressAutofillSettings();
    renderSettings(settings);
  };

  void update();
  return { update };

  async function saveScopeSettings(message: string): Promise<void> {
    const current = await loadAddressAutofillSettings();
    const countryCode = countrySelect.value;
    const city = cityInput.value.trim();
    const scopeChanged = current.countryCode !== countryCode || current.city.trim() !== city;
    const settings = await saveAddressAutofillSettings({
      countryCode,
      city,
      lastAddress: scopeChanged ? null : current.lastAddress,
    });
    renderSettings(settings);
    setStatus(status, message, 'ok');
  }

  async function fetchAddress(): Promise<void> {
    fetchButton.disabled = true;
    setStatus(status, '正在获取随机地址...', 'pending');
    try {
      const response = await browser.runtime.sendMessage({
        type: 'opx:fetch-random-address',
        countryCode: countrySelect.value,
        city: cityInput.value.trim(),
      });
      if (!isRandomAddressResponse(response) || !response.ok || !response.address) {
        setStatus(status, response?.message || '获取地址失败', 'error');
        return;
      }
      const next = await saveAddressAutofillSettings({
        countryCode: countrySelect.value,
        city: cityInput.value.trim(),
        lastAddress: response.address,
      });
      renderSettings(next);
      const autofillMessage = await fillCurrentPaymentPage(response.address);
      setStatus(status, autofillMessage ? `地址已获取并保存；${autofillMessage}` : '地址已获取并保存', 'ok');
    } catch (error) {
      setStatus(status, `获取地址失败：${errorMessage(error)}`, 'error');
    } finally {
      fetchButton.disabled = false;
    }
  }

  async function fillCurrentPaymentPage(address: AddressProfile): Promise<string> {
    if (location.hostname === 'pay.openai.com') {
      return (await fillPayOpenAiAddressNow(address)).message;
    }
    if (location.hostname.endsWith('paypal.com')) {
      return (await fillPaypalAddressNow(address, true, false)).message;
    }
    return '';
  }

  function renderSettings(settings: AddressAutofillSettings): void {
    countrySelect.value = settings.countryCode;
    cityInput.value = settings.city;
    renderSummary(settings);
    renderAddress(settings.lastAddress);
  }

  function renderSummary(settings: AddressAutofillSettings): void {
    const countryLabel = countrySelect.selectedOptions[0]?.textContent || settings.countryCode;
    const cityLabel = settings.city || '随机城市';
    summary.textContent = `${countryLabel} · ${cityLabel}`;
  }

  function renderAddress(address: AddressProfile | null): void {
    currentList.textContent = '';
    if (!address) {
      currentList.append(createEmpty('暂无地址，点击“获取地址”。'));
      return;
    }
    currentList.append(createEmpty(`已保存 ${address.countryLabel || address.countryCode} 地址，用于支付页填写。`));
  }
}

function createCountrySelect(): HTMLSelectElement {
  const select = document.createElement('select');
  select.className = 'opx-select';
  const randomCountryOption = document.createElement('option');
  randomCountryOption.value = 'RANDOM';
  randomCountryOption.textContent = '随机国家';
  select.append(randomCountryOption);
  for (const country of ADDRESS_COUNTRY_OPTIONS) {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.label} / ${country.code}`;
    select.append(option);
  }
  return select;
}

function createField(label: string, control: HTMLElement): HTMLElement {
  const field = document.createElement('label');
  field.className = 'opx-field';
  const caption = document.createElement('span');
  caption.className = 'opx-label';
  caption.textContent = label;
  field.append(caption, control);
  return field;
}

function createButton(label: string, className = 'opx-button'): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.type = 'button';
  button.textContent = label;
  return button;
}

function createEmpty(text: string): HTMLElement {
  const item = document.createElement('div');
  item.className = 'opx-empty-inline';
  item.textContent = text;
  return item;
}

function setStatus(element: HTMLElement, message: string, type: 'pending' | 'ok' | 'error'): void {
  element.textContent = message;
  element.dataset.type = type;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isRandomAddressResponse(value: unknown): value is RandomAddressResponse {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as RandomAddressResponse).ok === 'boolean' &&
      typeof (value as RandomAddressResponse).message === 'string',
  );
}
