import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { networkInterfaces, platform } from 'node:os';

const host = process.env.OPX_LAN_HOST || '0.0.0.0';
const port = Number(process.env.OPX_LAN_PORT || 8789);
const token = process.env.OPX_LAN_TOKEN || '';

const server = createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || `${host}:${port}`}`);

  if (requestUrl.pathname === '/' || requestUrl.pathname === '/help') {
    sendHtml(res, helpPage());
    return;
  }

  if (requestUrl.pathname === '/health') {
    sendJson(res, 200, { ok: true, message: 'ok' });
    return;
  }

  if (requestUrl.pathname !== '/run') {
    sendJson(res, 404, { ok: false, message: 'not found' });
    return;
  }

  if (token && requestUrl.searchParams.get('token') !== token) {
    sendJson(res, 403, { ok: false, message: 'token invalid' });
    return;
  }

  const rawPay = requestUrl.searchParams.get('pay') ||
    requestUrl.searchParams.get('url') ||
    requestUrl.searchParams.get('link') ||
    requestUrl.searchParams.get('paymentLink') ||
    '';
  const normalized = normalizePaymentUrl(rawPay);
  if (!normalized.ok) {
    sendJson(res, 400, normalized);
    return;
  }

  const incognito = truthy(requestUrl.searchParams.get('incognito')) ||
    truthy(requestUrl.searchParams.get('private'));
  openChrome(normalized.url, incognito)
    .then(() => {
      sendJson(res, 200, {
        ok: true,
        message: 'opened',
        url: normalized.url,
        incognito,
      });
    })
    .catch((error) => {
      sendJson(res, 500, {
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      });
    });
});

server.listen(port, host, () => {
  console.log(`OPX LAN pay server listening on http://${host}:${port}`);
  for (const ip of localIPv4Addresses()) {
    console.log(`LAN URL: http://${ip}:${port}/run?pay=${encodeURIComponent('https://pay.openai.com/pay?...')}${token ? `&token=${encodeURIComponent(token)}` : ''}`);
  }
  if (token) {
    console.log('Token protection: enabled');
  } else {
    console.log('Token protection: disabled. Set OPX_LAN_TOKEN to require token.');
  }
});

function openChrome(url, incognito) {
  const args = chromeOpenCommand(url, incognito);
  return new Promise((resolve, reject) => {
    const child = spawn(args.command, args.args, {
      detached: true,
      stdio: 'ignore',
    });
    child.on('error', reject);
    child.unref();
    resolve();
  });
}

function chromeOpenCommand(url, incognito) {
  const os = platform();
  if (os === 'darwin') {
    if (incognito) {
      return {
        command: 'open',
        args: ['-na', 'Google Chrome', '--args', '--incognito', url],
      };
    }
    return {
      command: 'open',
      args: ['-a', 'Google Chrome', url],
    };
  }

  if (os === 'win32') {
    return {
      command: 'cmd',
      args: ['/c', 'start', '', 'chrome', ...(incognito ? ['--incognito'] : []), url],
    };
  }

  return {
    command: 'google-chrome',
    args: [...(incognito ? ['--incognito'] : []), url],
  };
}

function normalizePaymentUrl(raw) {
  if (!raw.trim()) {
    return { ok: false, message: 'missing pay url' };
  }
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== 'https:') {
      return { ok: false, message: 'pay url must be https' };
    }
    if (!isSupportedPaymentHost(url.hostname)) {
      return { ok: false, message: 'unsupported payment host' };
    }
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, message: 'invalid pay url' };
  }
}

function isSupportedPaymentHost(hostname) {
  return hostname === 'pay.openai.com' ||
    hostname === 'chatgpt.com' ||
    hostname === 'chat.openai.com' ||
    hostname.endsWith('paypal.com') ||
    hostname.endsWith('stripe.com') ||
    hostname.endsWith('stripe.com.cn');
}

function truthy(value) {
  return /^(1|true|yes|on)$/i.test(String(value || '').trim());
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
  });
  res.end(JSON.stringify(payload));
}

function sendHtml(res, html) {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(html);
}

function localIPv4Addresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((item) => item && item.family === 'IPv4' && !item.internal)
    .map((item) => item.address);
}

function helpPage() {
  const auth = token ? '&token=YOUR_TOKEN' : '';
  return `<!doctype html>
<meta charset="utf-8">
<title>OPX LAN Pay Server</title>
<body>
  <h1>OPX LAN Pay Server</h1>
  <p>Use <code>/run?pay=PAY_URL${auth}</code> to open a payment link on this computer.</p>
  <form action="/run" method="get">
    <input name="pay" placeholder="https://pay.openai.com/pay?..." style="width: 520px">
    ${token ? '<input name="token" placeholder="token">' : ''}
    <label><input type="checkbox" name="incognito" value="1"> incognito</label>
    <button type="submit">Open</button>
  </form>
</body>`;
}
