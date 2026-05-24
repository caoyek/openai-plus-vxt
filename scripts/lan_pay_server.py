#!/usr/bin/env python3
import json
import os
import platform
import subprocess
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, quote, urlparse


HOST = os.environ.get("OPX_LAN_HOST", "0.0.0.0")
PORT = int(os.environ.get("OPX_LAN_PORT", "8789"))
TOKEN = os.environ.get("OPX_LAN_TOKEN", "")


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)

        if parsed.path in ("/", "/help"):
            self.send_html(help_page())
            return

        if parsed.path == "/health":
            self.send_json(200, {"ok": True, "message": "ok"})
            return

        if parsed.path != "/run":
            self.send_json(404, {"ok": False, "message": "not found"})
            return

        if TOKEN and first(params, "token") != TOKEN:
            self.send_json(403, {"ok": False, "message": "token invalid"})
            return

        raw = first(params, "pay") or first(params, "url") or first(params, "link") or first(params, "paymentLink")
        normalized = normalize_payment_url(raw)
        if not normalized["ok"]:
            self.send_json(400, normalized)
            return

        incognito = truthy(first(params, "incognito")) or truthy(first(params, "private"))
        try:
            open_chrome(normalized["url"], incognito)
            self.send_json(200, {
                "ok": True,
                "message": "opened",
                "url": normalized["url"],
                "incognito": incognito,
            })
        except Exception as error:
            self.send_json(500, {"ok": False, "message": str(error)})

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("access-control-allow-origin", "*")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_html(self, html):
        body = html.encode("utf-8")
        self.send_response(200)
        self.send_header("content-type", "text/html; charset=utf-8")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def first(params, key):
    values = params.get(key, [])
    return values[0].strip() if values else ""


def normalize_payment_url(raw):
    raw = (raw or "").strip()
    if not raw:
        return {"ok": False, "message": "missing pay url"}
    parsed = urlparse(raw)
    if parsed.scheme != "https":
        return {"ok": False, "message": "pay url must be https"}
    if not is_supported_payment_host(parsed.hostname or ""):
        return {"ok": False, "message": "unsupported payment host"}
    return {"ok": True, "url": raw}


def is_supported_payment_host(hostname):
    return (
        hostname == "pay.openai.com"
        or hostname == "chatgpt.com"
        or hostname == "chat.openai.com"
        or hostname.endswith("paypal.com")
        or hostname.endswith("stripe.com")
        or hostname.endswith("stripe.com.cn")
    )


def open_chrome(url, incognito):
    system = platform.system()
    if system == "Darwin":
        args = ["open", "-na" if incognito else "-a", "Google Chrome"]
        if incognito:
            args += ["--args", "--incognito", url]
        else:
            args.append(url)
        subprocess.Popen(args)
        return

    if system == "Windows":
        subprocess.Popen(["cmd", "/c", "start", "", "chrome"] + (["--incognito"] if incognito else []) + [url])
        return

    subprocess.Popen(["google-chrome"] + (["--incognito"] if incognito else []) + [url])


def truthy(value):
    return str(value or "").lower() in ("1", "true", "yes", "on")


def help_page():
    token_param = "&token=YOUR_TOKEN" if TOKEN else ""
    return f"""<!doctype html>
<meta charset="utf-8">
<title>OPX LAN Pay Server</title>
<body>
  <h1>OPX LAN Pay Server</h1>
  <p>Use <code>/run?pay=PAY_URL{token_param}</code> to open a payment link on this computer.</p>
  <form action="/run" method="get">
    <input name="pay" placeholder="https://pay.openai.com/pay?..." style="width: 520px">
    {'<input name="token" placeholder="token">' if TOKEN else ''}
    <label><input type="checkbox" name="incognito" value="1"> incognito</label>
    <button type="submit">Open</button>
  </form>
</body>"""


if __name__ == "__main__":
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"OPX Python LAN pay server listening on http://{HOST}:{PORT}")
    print(f"Example: http://THIS_COMPUTER_IP:{PORT}/run?pay={quote('https://pay.openai.com/pay?...')}{'&token=' + TOKEN if TOKEN else ''}")
    httpd.serve_forever()
