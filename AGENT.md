# AGENT.md

## ByteCola Branding Case

This project currently has an active downstream branding customization for **ByteCola**.

### Product Direction

- Brand name: `ByteCola`
- Brand message: `Make AI as easy to use as opening a cola`
- Docs strategy: frontend branding can change, but help docs may continue using `New API Docs`

### Asset Usage Convention

- Shared UI logo:
  - default source: `/logo.png`
  - used by header, login, register, reset-password, and other common entry points
- Large-format branding image:
  - source: `/bytecola.png`
  - used by Home hero and About default page
- Browser/PWA icons:
  - controlled by `web/index.html` and `web/public/site.webmanifest`
  - do not override them at runtime with `getLogo()`

### Current Implementation Notes

- `common/constants.go`: default `SystemName` is `ByteCola`
- `web/src/helpers/utils.jsx`: `getLogo()` still defaults to `/logo.png`
- `web/src/pages/Home/index.jsx`: Home explicitly uses `/bytecola.png`
- `web/src/pages/About/index.jsx`: About explicitly uses `/bytecola.png`
- `web/src/components/layout/PageLayout.jsx`: runtime favicon override was removed on purpose

### Prepared Content Sources

- `docs/branding/bytecola-about.md`
- `docs/branding/bytecola-footer.html`
- `docs/branding/bytecola-user-agreement.md`
- `docs/branding/bytecola-privacy-policy.md`
- `docs/branding/bytecola-brand-kit.md`

### Known Environment / Validation Notes

- Local syntax validation succeeded with:
  - `.\\node_modules\\.bin\\eslint.cmd src\\pages\\Home\\index.jsx src\\pages\\About\\index.jsx src\\components\\layout\\Footer.jsx src\\components\\layout\\PageLayout.jsx --no-ignore`
- Full frontend `vite build` is currently blocked by an existing package/export issue:
  - `Missing "./dist/css/semi.css" specifier in "@douyinfe/semi-ui" package`
- In this Windows environment, `npm install` required:
  - `npm install --legacy-peer-deps`

### Continue-From-Here Checklist

- Keep shared UI on `/logo.png` unless backend `Logo` config is intentionally changed
- Keep Home/About large visuals on `/bytecola.png`
- Prefer admin-configurable content for Footer / About / User Agreement / Privacy Policy
- Be careful with encoding when editing older frontend files that contain Chinese strings
