import type { AddressProfile } from '../address-autofill/types';

export interface ExtensionSettings {
  addressAutofill: AddressAutofillSettings;
  tempMail: TempMailSettings;
  updatedAt: number;
}

export interface AddressAutofillSettings {
  payOpenAiEnabled: boolean;
  payPalSignupEnabled: boolean;
  countryCode: string;
  city: string;
  lastAddress: AddressProfile | null;
  updatedAt: number;
}

export interface TempMailSettings {
  apiBase: string;
  adminAuth: string;
  domain: string;
  mailboxName: string;
  customAuth: string;
  updatedAt: number;
}
