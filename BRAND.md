# BRAND.md

本文件用于沉淀 ByteCola 品牌定义、当前品牌化改造状态，以及在新对话中继续开发时可直接复用的上下文。

## 1. 项目背景

- 项目仓库：`D:\AIplayground\new-api`
- 项目类型：Go + Gin + GORM 的 AI API Gateway / Proxy，前端为 React 18 + Vite + Semi Design UI
- 当前品牌化目标：将前台品牌从默认模板切换为 `ByteCola`
- 品牌定位：`让 AI 像可乐一样即开即用`
- 品牌化原则：优先复用现有配置能力，再做轻量代码品牌化，避免重前端重构

## 2. 品牌定义

### 2.1 核心信息

- Brand Name: `ByteCola`
- Chinese Name: `字节可乐`
- Primary Slogan: `让 AI 像可乐一样即开即用`
- English Slogan: `AI, open and ready like cola.`
- Brand Personality: `即时、轻快、亲和、可靠、可运营`
- Official Domain: `bytecola.cn`
- Contact Email: `comizhang@outlook.com`
- Effective Date for legal docs: `2026-05-01`
- Operating Entity (current placeholder naming): `ByteCola官方运营方`

### 2.2 品牌色

- Byte Blue: `#1494D1`
- Cola Red: `#DB0D18`
- Brand Background: `#F7F4F1`
- Bubble Mist: `#D9E2E7`
- Deep Ink: `#11212B`

### 2.3 字体

- Logo Typeface: `Fredoka Bold`
- Recommended Chinese UI Typeface: `Noto Sans SC`
- Recommended Latin UI Typeface: `Inter`

## 3. Logo 套件

### 3.1 已生成资源

位于 `web/public/`：

- `bytecola.png`
  - 主字标 PNG，严格沿用原始 Logo 构图
- `bytecola-logo-primary.png`
  - 主 Logo 原始展示版
- `bytecola-logo-mark.png`
  - 从原始 Logo 提取的 `B` 字形版 Logo Mark
- `bytecola-logo-app-icon.png`
  - 方形应用图标版，保留蓝红双字与气泡装饰
- `logo.png`
  - 当前默认站点 Logo
- `favicon.ico`
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

### 3.2 使用建议

- `logo.png`
  - 用于页头、登录页、注册页、找回密码页
- `bytecola.png`
  - 用于首页 Hero、关于页、宣传物料、运营内容
- `bytecola-logo-mark.png`
  - 用于 favicon、小尺寸角标、紧凑品牌位
- `bytecola-logo-app-icon.png`
  - 用于移动端图标、应用图标、分享封面

### 3.3 小尺寸规则

- `64px` 以下不要使用整版字标
- 浏览器 favicon 优先使用 `bytecola-logo-mark.png` 体系
- 移动端图标优先使用 `bytecola-logo-app-icon.png`

## 4. 已完成工作

### 4.1 品牌文档

已在 `docs/branding/` 下创建：

- `bytecola-brand-kit.md`
- `bytecola-about.md`
- `bytecola-footer.html`
- `bytecola-user-agreement.md`
- `bytecola-privacy-policy.md`

这些文件用于：

- 后台配置粘贴
- 品牌规范沉淀
- 法务与运营内容初始化

### 4.2 代码与资源层改造

已确认或已修改的关键入口：

- `common/constants.go`
  - `SystemName = "ByteCola"`
- `web/src/helpers/utils.jsx`
  - `getSystemName()` 默认回退为 `ByteCola`
  - `getLogo()` 默认回退为 `/logo.png`
- `web/index.html`
  - 已切换 favicon / manifest / title / generator / meta description 为 ByteCola 方向
- 认证页已进入品牌化改造范围：
  - `web/src/components/auth/LoginForm.jsx`
  - `web/src/components/auth/RegisterForm.jsx`
  - `web/src/components/auth/PasswordResetForm.jsx`
  - `web/src/components/auth/PasswordResetConfirm.jsx`
- 页面品牌化改造范围：
  - `web/src/pages/Home/index.jsx`
  - `web/src/pages/About/index.jsx`
  - `web/src/components/layout/Footer.jsx`

## 5. 当前状态判断

当前品牌化不是“从零开始”，而是“资源已补齐、代码已部分改造、仍需收尾和同步”。

### 已达到的阶段

- ByteCola 品牌资产已具备基本可用性
- Logo 套件已生成
- 基础品牌文案已整理
- 系统名默认值已切到 `ByteCola`
- 前台默认页已有品牌化改造痕迹

### 尚未完全完成的部分

- 仍有部分前台文案没有完全同步到最终稿
- 若干文件在当前终端查看时出现乱码表现，需要注意编码与内容一致性
- 后台配置项与代码默认值尚未完全统一
- 首页、关于页、页脚、协议页仍需要最终联调

## 6. 当前卡点 / 已知问题

### 6.1 编码与显示问题

当前若干文档和前台源码在终端输出时出现中文乱码，重点关注：

- `docs/branding/bytecola-brand-kit.md`
- `docs/branding/bytecola-about.md`
- `docs/branding/bytecola-footer.html`
- `web/index.html`
- `web/src/pages/About/index.jsx`
- `web/src/pages/Home/index.jsx`
- `web/src/components/layout/Footer.jsx`
- 若干认证页中的品牌标语字符串

需要在后续开发中确认：

- 是文件内容实际损坏
- 还是 PowerShell / 终端编码显示问题
- 必要时统一按 UTF-8 无 BOM 修正

### 6.2 构建验证未完成

之前尝试执行前端构建时遇到环境问题：

- `bun` 不存在
- `vite` 也无法直接执行

因此当前品牌化修改还没有经过完整的构建验证。

### 6.3 保护性约束

根据项目 `AGENTS.md` 约束：

- 不允许删除或替换受保护的 `new-api` / `QuantumNous` 项目标识
- 尤其不能改 README、版权头、模块路径、受保护说明中的品牌归属信息

这意味着：

- 可以做前台品牌化和默认展示替换
- 但不能把受保护项当作普通品牌字符串粗暴全局替换

## 7. 关键文件与作用

### 品牌资源

- `web/public/bytecola.png`
- `web/public/bytecola-logo-primary.png`
- `web/public/bytecola-logo-mark.png`
- `web/public/bytecola-logo-app-icon.png`
- `web/public/logo.png`
- `web/public/favicon.ico`
- `web/public/site.webmanifest`

### 品牌配置与默认值

- `common/constants.go`
- `web/src/helpers/utils.jsx`

### 前台品牌入口

- `web/index.html`
- `web/src/pages/Home/index.jsx`
- `web/src/pages/About/index.jsx`
- `web/src/components/layout/Footer.jsx`
- `web/src/components/auth/LoginForm.jsx`
- `web/src/components/auth/RegisterForm.jsx`
- `web/src/components/auth/PasswordResetForm.jsx`
- `web/src/components/auth/PasswordResetConfirm.jsx`

### 品牌文案源

- `docs/branding/bytecola-brand-kit.md`
- `docs/branding/bytecola-about.md`
- `docs/branding/bytecola-footer.html`
- `docs/branding/bytecola-user-agreement.md`
- `docs/branding/bytecola-privacy-policy.md`

## 8. 建议的后台配置值

如果使用系统后台品牌配置，建议优先设置为：

- `SystemName = ByteCola`
- `Logo = /logo.png`
  - 如果前台希望默认显示完整字标，也可改为 `/bytecola.png`
- `Footer = docs/branding/bytecola-footer.html` 的内容
- `About = docs/branding/bytecola-about.md` 的内容
- `HomePageContent`
  - 后续可补一版 ByteCola 首页 Markdown
- 用户协议内容
  - 使用 `docs/branding/bytecola-user-agreement.md`
- 隐私政策内容
  - 使用 `docs/branding/bytecola-privacy-policy.md`

## 9. 接下来要做什么

推荐后续目标按顺序推进：

1. 统一修复品牌文档和前台默认文案中的乱码/编码问题
2. 把 `docs/branding/` 已填好的邮箱、域名、生效日期同步到前台默认展示
3. 检查 `logo.png` 和 `/bytecola.png` 在登录页、页头、首页中的实际显示效果
4. 完成首页默认 Hero、关于页默认描述、页脚默认内容的最终版
5. 视情况补一版可直接粘贴到后台的 `HomePageContent`
6. 补做构建验证，确认需要的 `bun` / `vite` 依赖可运行

## 10. 新对话续接 Prompt

下面这段可以在新开对话时直接发出去：

```text
我正在对 D:\AIplayground\new-api 做 ByteCola 品牌化改造。

项目背景：
- 这是一个 Go + Gin + GORM 的 AI API Gateway / Proxy，前端是 React 18 + Vite + Semi Design。
- 品牌目标是“让 AI 像可乐一样即开即用”。
- 品牌名是 ByteCola，域名是 bytecola.cn，联系邮箱是 comizhang@outlook.com，法律文档生效日期是 2026-05-01。

已完成：
- 已生成品牌资源，位于 web/public/：bytecola.png、bytecola-logo-primary.png、bytecola-logo-mark.png、bytecola-logo-app-icon.png、logo.png、favicon.ico、favicon-32x32.png、favicon-16x16.png、apple-touch-icon.png、android-chrome-192x192.png、android-chrome-512x512.png、site.webmanifest。
- 已创建品牌文案和法务文档，位于 docs/branding/：bytecola-brand-kit.md、bytecola-about.md、bytecola-footer.html、bytecola-user-agreement.md、bytecola-privacy-policy.md。
- 默认系统名已切到 ByteCola，关键入口包括 common/constants.go、web/src/helpers/utils.jsx、web/index.html、web/src/pages/Home/index.jsx、web/src/pages/About/index.jsx、web/src/components/layout/Footer.jsx、以及认证页几个组件。

当前问题：
- 若干文档和前台文件在终端中出现中文乱码，需要确认并统一修复编码或字符串内容。
- 品牌文案已部分填入，但还需要把邮箱、域名、生效日期等信息同步到前台默认展示。
- 前端构建验证还没完成，因为当前环境里 bun/vite 不可直接执行。

约束：
- 不能删除或替换受保护的 new-api / QuantumNous 项目标识，尤其是 README、版权头、模块路径和受保护说明。

接下来请做：
- 优先检查并修复品牌相关文档和前台代码中的乱码。
- 同步 docs/branding 中已确定的品牌信息到首页、关于页、页脚、认证页默认文案。
- 保持现有 ByteCola logo 套件路径不变，并继续沿用 /logo.png 作为默认站点 logo，必要时使用 /bytecola.png 作为完整字标展示。
```

## 11. 备注

- 当前仓库里除品牌改造外，还存在其它未提交修改，不要误回滚用户已有改动。
- 如果继续改代码，优先做“小范围同步”，不要做大规模重写。
