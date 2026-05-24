import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage', 'tabs', 'scripting'],
    host_permissions: [
      'https://auth.openai.com/*',
      'https://chatgpt.com/*',
      'https://pay.openai.com/*',
      'https://www.paypal.com/*',
      'https://paypal.com/*',
      'https://www.meiguodizhi.com/*',
      'https://api.github.com/*',
      'https://*/*',
      'http://*/*',
    ],
  },
});
