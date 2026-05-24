# OpenAI Plus VXT

一个基于 [WXT](https://wxt.dev/) 的浏览器插件，用于辅助 ChatGPT 注册、Checkout 链接提取、随机地址资料生成，以及 OpenAI/PayPal 支付页资料自动填写。

TG 群组：[https://t.me/fuck_open](https://t.me/fuck_open)

## 功能

- 注册辅助
  - 支持在设置中配置 Temp Mail Worker、`admin_auth` 和邮箱域名。
  - 点击“生成邮箱并继续”会自动创建临时邮箱地址并提交注册邮箱。
  - 在 OpenAI 邮箱验证码页可手动填验证码，也可通过临时邮箱 API 自动收码并提交。
  - 在资料页自动填写英文姓名和年龄。

- 提链接
  - 切换到“提链接”tab 时读取 `https://chatgpt.com/api/auth/session`。
  - 从 session 中读取 `accessToken`、`user.email`、`account.planType`。
  - 支持生成 ChatGPT checkout 长链接和短链接。
  - Checkout 参数可在插件内调整并持久化。

- 地址资料
  - 支持从 `https://www.meiguodizhi.com/` 获取随机地址资料。
  - 支持指定国家、指定城市，或随机国家/随机城市。
  - 地址、身份、就业、信用卡等资料可在插件面板中查看和复制。
  - 当前地址资料会保存到本地，页面刷新后仍可使用。

- 支付页自动填写
  - `pay.openai.com/c/pay`：自动选择 PayPal、填写姓名、国家、地址、邮编、电话，并勾选条款。
  - `paypal.com/checkoutweb/signup`：自动填写国家、邮箱、卡资料、姓名、地址、密码，并显示“当前密码和邮箱一致”的提示。
  - 两个页面的自动填写开关在设置里独立控制，默认开启。

- 插件面板
  - 右侧浮动面板，支持收起/展开。
  - 收起状态、当前 tab、输入内容和设置会保存在本地。
  - 设置页显示当前插件版本号，支持手动检测 GitHub Release 更新。
  - 设置页提供 TG 群组入口：[https://t.me/fuck_open](https://t.me/fuck_open)。 

## 截图

### 注册辅助

![注册辅助](image/reg.png)

### 提链接

![提链接](image/link.png)

### 地址资料

![地址资料](image/address.png)

### 接码

![接码](image/sms.png)

### 设置

![设置](image/settings.png)

## 开发环境

需要安装：

- Node.js
- pnpm
- Chrome 或 Chromium

安装依赖：

```bash
pnpm install
```

启动开发模式：

```bash
pnpm dev
```

WXT 会启动浏览器并加载插件。也可以使用手动调试模式：

```bash
pnpm dev:manual
```

类型检查：

```bash
pnpm compile
```

构建：

```bash
pnpm build
```

打包：

```bash
pnpm zip
```

Firefox：

```bash
pnpm dev:firefox
pnpm build:firefox
pnpm zip:firefox
```

## 临时邮箱自动收码 API

注册模块支持使用 [Temp Mail](https://temp-mail-docs.awsl.uk/zh/guide/feature/new-address-api.html) 的地址 JWT 邮件 API 自动读取验证码。

在设置页填写：

```text
Worker 地址
admin_auth
邮箱域名
```

如果启用了私有站点密码，也可以填写 `x-custom-auth`。邮箱名称可留空，留空时插件会随机生成。

插件会在点击“生成邮箱并继续”时调用 `POST /admin/new_address` 创建邮箱地址，然后调用 `GET /api/mails` 轮询邮件，并从返回的 raw/source 邮件内容中提取 OpenAI 验证码。

## 权限和匹配页面

插件会注入以下页面：

- `https://chatgpt.com/*`
- `https://auth.openai.com/*`
- `https://pay.openai.com/*`
- `https://www.paypal.com/*`
- `https://paypal.com/*`

插件请求的 host permissions 包含：

- 临时邮箱 Worker API：用于 `/admin/new_address` 和 `/api/mails`
- ChatGPT / OpenAI Auth / OpenAI Pay
- PayPal
- meiguodizhi 地址资料站点
- GitHub Releases API：用于版本更新检查

## 发布版本

后续如果上传到 GitHub，建议使用 GitHub Releases 发布版本：

1. 修改 `package.json` 中的 `version`。
2. 执行：

```bash
pnpm compile
pnpm build
pnpm zip
```

3. 在 GitHub Releases 中创建 `vX.Y.Z` 版本。
4. 上传 `.output` 中生成的 zip 文件。
5. 在 Release notes 写更新说明。

插件会通过 GitHub Releases API 检测最新正式版。如果最新版本高于当前插件版本，会在插件顶部显示更新提示、下载地址和更新说明。设置页也提供“检测更新”按钮，可手动强制刷新版本检查。

## 项目结构

```text
entrypoints/
  background.ts          后台消息处理、临时邮箱收码、checkout 创建
  content.ts             内容脚本入口，挂载右侧插件面板和自动填写模块
src/
  app/                   面板主框架、状态、样式
  features/
    register/            注册辅助
    link-extractor/      Checkout 链接提取
    address-autofill/    地址资料和支付页自动填写
    version-check/       GitHub Release 版本检查和更新提示
    sms/                 接码链接轮询和验证码历史
    settings/            设置页和持久化设置
scripts/                 本地调试脚本
wxt.config.ts            WXT 和扩展 manifest 配置
```

## 注意

本项目用于浏览器插件开发和流程辅助。支付页、第三方站点和 API 结构可能随时变化，自动填写选择器需要根据实际页面保持维护。
