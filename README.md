# OpenAI Plus VXT

一个基于 [WXT](https://wxt.dev/) 的 Chrome 插件，用于辅助 ChatGPT 注册、生成/打开 OpenAI Checkout 长链、随机地址资料、接码，以及 OpenAI Pay / PayPal 页面自动填写。

当前仓库已包含可直接加载的构建目录：

```text
chrome-extension/
```

在 Chrome 打开 `chrome://extensions`，开启开发者模式，点击“加载已解压的扩展程序”，选择上面的 `chrome-extension` 目录即可。

## 主要功能

- 注册辅助
  - 使用 Temp Mail Worker 创建临时邮箱，不需要手动填写邮箱。
  - 支持配置 Worker 地址、`admin_auth`、邮箱域名和可选 `x-custom-auth`。
  - OpenAI 邮箱验证码页支持自动从临时邮箱 API 获取验证码并提交。
  - 注册资料页自动填写姓名、生日等基础信息。

- Checkout 长链
  - 插件 popup 支持直接粘贴支付长链并打开。
  - 支持粘贴 ChatGPT `accessToken` 或 session JSON 生成 hosted checkout 长链。
  - 支持 Plus / Team、区域、workspace、席位等参数。
  - 长链输入默认不恢复旧链接，避免误开上一次链接。

- OpenAI Pay 自动化
  - 在 `pay.openai.com` 自动选择 PayPal 支付方式。
  - 自动获取随机地址并填写账单地址。
  - 地址字段填完后再点击“订阅”按钮。
  - 如果 Google 地址建议下拉出现，会先尝试确认/关闭建议，不会因为建议框卡住提交。
  - 订阅按钮会持续补点，降低偶发没点中的情况。

- PayPal 自动化
  - PayPal 邮箱页自动生成随机 Gmail 并进入创建账户流程。
  - PayPal 资料页自动填写邮箱、随机 10 位数字字母密码、姓名、地址、卡资料。
  - 手机号优先使用“接码”面板第一行号码，填写到 PayPal 页面时会去掉美国 `+1`。
  - 资料填写完成后自动点击 `Agree & Create Account`。
  - 验证码页识别 `ciBasic-*` 这类分格输入框，只接受 6 位短信验证码。
  - 验证码框出现后会主动调用接码 API 获取最新短信并填写。
  - 最后 `www.paypal.com/webapps/hermes` 页面会自动点击 `Agree and Continue`。

- 接码
  - 接码面板支持 `手机号----API链接` 格式。
  - 不自动每 3 秒刷新，改为手动获取。
  - 验证码历史只保留/显示最后一次验证码。

- 外部网页触发
  - 外部网页可以通过 `window.postMessage` 把支付长链传给插件。
  - 插件收到后会打开支付页，并继续走 OpenAI Pay / PayPal 自动流程。

## 外部网页传入长链

任意已打开在当前 Chrome 中的网页可以这样触发插件：

```js
window.postMessage({
  type: 'opx:run-pay-link',
  pay: 'https://pay.openai.com/pay?...',
  incognito: false
}, '*');
```

支持的长链字段名：

```text
pay
url
link
paymentLink
```

监听结果：

```js
window.addEventListener('message', (event) => {
  if (event.data?.type === 'opx:run-pay-link-result') {
    console.log(event.data);
  }
});
```

如果设置：

```js
incognito: true
```

插件会尝试用无痕窗口打开。需要先在 `chrome://extensions` 中给本插件开启“允许在无痕模式下使用”。

注意：另一台局域网电脑不能直接请求 Chrome 插件。要跨电脑触发，需要在安装插件的电脑上额外运行一个 HTTP 中转服务，再由中转服务打开本机 Chrome 页面或调用本机逻辑。

## 局域网触发

仓库内置了一个本机 HTTP 接收器，用于让另一台局域网电脑传入支付长链。

在安装插件的电脑上运行：

```bash
pnpm lan
```

默认监听：

```text
0.0.0.0:8789
```

另一台局域网电脑请求：

```text
http://这台电脑IP:8789/run?pay=https%3A%2F%2Fpay.openai.com%2Fpay%3Fxxx
```

这台电脑收到请求后会用本机 Chrome 打开支付长链，插件会继续自动跑 OpenAI Pay / PayPal 流程。

支持参数：

```text
pay / url / link / paymentLink  支付长链
incognito=1                    使用无痕窗口
```

建议加 token，避免局域网内其他设备误触发：

```bash
OPX_LAN_TOKEN=your-token pnpm lan
```

带 token 请求：

```text
http://这台电脑IP:8789/run?pay=https%3A%2F%2Fpay.openai.com%2Fpay%3Fxxx&token=your-token
```

如果 macOS 防火墙弹窗，允许 Node.js 接收局域网连接即可。

## Popup 参数启动

也可以通过插件 popup URL 传入参数：

```text
chrome-extension://扩展ID/popup.html?pay=https%3A%2F%2Fpay.openai.com%2Fpay%3Fxxx&auto=1
```

参数：

```text
pay / url / link / paymentLink  支付长链
auto=1 或 run=1                自动打开
incognito=1                    无痕打开
```

## 临时邮箱 API

注册模块使用 [Temp Mail](https://temp-mail-docs.awsl.uk/zh/guide/feature/new-address-api.html)。

设置页填写：

```text
Worker 地址
admin_auth
邮箱域名
x-custom-auth（可选）
邮箱名称（可选，留空自动随机）
```

创建邮箱时调用：

```text
POST /admin/new_address
```

读取邮件时调用：

```text
GET /api/mails
```

插件会从邮件 raw/source/text/html 等内容里提取 OpenAI 验证码。

## 接码格式

接码面板每行格式：

```text
+14642649811----https://example.com/sms-api
```

PayPal 资料页填写手机号时会使用第一行号码，并去掉美国区号：

```text
+14642649811 -> 4642649811
```

短信验证码必须是 6 位数字，PayPal 验证码页不会填入 4 位或 8 位验证码。

## 开发

安装依赖：

```bash
pnpm install
```

开发模式：

```bash
pnpm dev
```

类型检查：

```bash
pnpm compile
```

构建：

```bash
pnpm build
```

同步可加载目录：

```bash
rm -rf chrome-extension
mkdir -p chrome-extension
cp -R .output/chrome-mv3/. chrome-extension/
```

完整构建命令：

```bash
pnpm compile && pnpm build && rm -rf chrome-extension && mkdir -p chrome-extension && cp -R .output/chrome-mv3/. chrome-extension/
```

## 权限和注入页面

当前 content script 匹配：

```text
http://*/*
https://*/*
```

插件会在普通网页安装外部长链 `postMessage` 桥接；只有在 OpenAI / ChatGPT / PayPal 相关页面才挂载右侧面板和自动化逻辑。

主要使用权限：

- `storage`：保存插件设置、输入内容和历史状态。
- `tabs`：打开支付长链页面。
- `scripting`：在目标页面注入内容脚本。
- `host_permissions`：访问 OpenAI、ChatGPT、PayPal、随机地址站点、GitHub Release、Temp Mail 和接码 API。

## 项目结构

```text
entrypoints/
  background.ts          后台消息、checkout 创建、临时邮箱、接码转发、外部长链入口
  content.ts             内容脚本入口、面板挂载、外部 postMessage 桥接
  popup/                 popup 长链/accessToken 入口
src/
  app/                   右侧面板框架、状态、样式
  features/
    register/            注册辅助和邮箱验证码
    link-extractor/      accessToken/session 到 checkout 长链
    address-autofill/    地址资料、OpenAI Pay、PayPal 自动填写
    sms/                 接码面板和验证码提取
    settings/            设置页和持久化配置
    version-check/       GitHub Release 更新检查
chrome-extension/        已构建的 Chrome MV3 插件目录
wxt.config.ts            WXT 和 manifest 配置
```

## 注意

支付页、PayPal、OpenAI、接码 API 和随机地址站点的 DOM/API 都可能变化。自动填写依赖页面选择器，遇到页面结构变化时需要继续维护选择器和点击策略。
