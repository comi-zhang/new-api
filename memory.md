# Memory

## Specific Operation

### Project Background / Requirement

This repo is a downstream customization of `new-api`.
The current main task is **ByteCola branding customization**, not core gateway logic changes.

- Brand name: `ByteCola`
- Brand message: `Make AI as easy to use as opening a cola`
- Docs strategy: frontend branding changes are allowed, while help docs may still point to `New API Docs`

Current goals:

- replace default system branding
- wire ByteCola logo / favicon / PWA icon assets
- update Home / About / auth pages for ByteCola branding
- keep backend-configurable logo support for `/logo.png` or `/bytecola.png`

### Completed Work

- Default system name changed to `ByteCola`
  - `common/constants.go`
  - `web/src/helpers/utils.jsx`

- Browser title, meta description, favicon, apple-touch-icon, and manifest entry points changed to ByteCola branding
  - `web/index.html`

- Login / Register / Reset Password / Reset Confirm pages now include a ByteCola branding subtitle
  - `web/src/components/auth/LoginForm.jsx`
  - `web/src/components/auth/RegisterForm.jsx`
  - `web/src/components/auth/PasswordResetForm.jsx`
  - `web/src/components/auth/PasswordResetConfirm.jsx`

- Home page now explicitly uses `web/public/bytecola.png` for the hero branding image
  - `web/src/pages/Home/index.jsx`

- About page default presentation now explicitly uses `web/public/bytecola.png`
  - `web/src/pages/About/index.jsx`

- Default footer attribution changed to:
  - `Brand experience: ByteCola - Docs: New API Docs`
  - `web/src/components/layout/Footer.jsx`

- Removed the runtime favicon override logic from `PageLayout.jsx`
  - this was important because it broke the dedicated `favicon.ico / apple-touch-icon / site.webmanifest` icon chain
  - `web/src/components/layout/PageLayout.jsx`

- Confirmed branding assets exist:
  - `web/public/logo.png`
  - `web/public/bytecola.png`
  - `web/public/bytecola-logo-primary.png`
  - `web/public/bytecola-logo-mark.png`
  - `web/public/bytecola-logo-app-icon.png`
  - `web/public/favicon.ico`
  - `web/public/favicon-32x32.png`
  - `web/public/favicon-16x16.png`
  - `web/public/apple-touch-icon.png`
  - `web/public/android-chrome-192x192.png`
  - `web/public/android-chrome-512x512.png`
  - `web/public/site.webmanifest`

- Confirmed branding content sources exist:
  - `docs/branding/bytecola-about.md`
  - `docs/branding/bytecola-footer.html`
  - `docs/branding/bytecola-user-agreement.md`
  - `docs/branding/bytecola-privacy-policy.md`
  - `docs/branding/bytecola-brand-kit.md`

### Current Completion Status

Completed:

- first pass of branding copy replacement
- second pass of logo / favicon / PWA asset wiring
- large-format branding for Home and About

Not finished:

- convert `docs/branding` content into backend-ready pasteable config values
- clean more old-brand wording in settings / technical hints
- resolve full frontend production build issues

### Current Problems / Blockers

#### 1. Full frontend production build is failing

This appears to be an existing dependency / export problem, not caused by the branding logic itself.

Error:

```text
vite build
error during build:
[commonjs--resolver] Missing "./dist/css/semi.css" specifier in "@douyinfe/semi-ui" package
```

#### 2. Dependency install requires peer conflict workaround

Plain `npm install` failed in this environment.
Used:

```powershell
npm install --legacy-peer-deps
```

Relevant conflict:

```text
Could not resolve dependency:
peer react@"^19.0.0" from @lobehub/icons@2.48.0
```

#### 3. Some older frontend files are encoding-sensitive

When editing older JSX files with Chinese strings, verify the resulting text carefully.

### Key Code / Config / Validation Info

#### Default logo strategy

```jsx
export function getLogo() {
  let logo = localStorage.getItem('logo');
  if (!logo) return '/logo.png';
  return logo;
}
```

Location:

- `web/src/helpers/utils.jsx`

Meaning:

- shared UI defaults to `/logo.png`
- backend can later set `Logo` to `/bytecola.png`

#### Home / About large image rule

- `Home` uses `/bytecola.png`
- `About` default display uses `/bytecola.png`

#### Removed favicon override logic

Previously `PageLayout.jsx` did something like:

```jsx
let logo = getLogo();
if (logo) {
  let linkElement = document.querySelector("link[rel~='icon']");
  if (linkElement) {
    linkElement.href = logo;
  }
}
```

That logic was removed because it overrides:

- `favicon.ico`
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`
- `site.webmanifest`

#### Verified local syntax check

These files passed syntax validation with the project-local ESLint binary:

```powershell
.\node_modules\.bin\eslint.cmd src\pages\Home\index.jsx src\pages\About\index.jsx src\components\layout\Footer.jsx src\components\layout\PageLayout.jsx --no-ignore
```

### Next Goal

Recommended next steps:

1. Turn `docs/branding/bytecola-about.md`, `bytecola-footer.html`, `bytecola-user-agreement.md`, and `bytecola-privacy-policy.md` into backend-ready pasteable config content.
2. Continue cleaning old brand wording, especially:
   - backend settings hints
   - Home demo button related text
   - About / Footer old-brand references
3. If moving toward release, separately debug the `vite build` dependency/export issue.

## Structured Prompt

I am working on a ByteCola branding customization on top of `new-api`.

- Brand: `ByteCola`
- Brand message: `Make AI as easy to use as opening a cola`
- Help docs may still use `New API Docs`

Current progress:

- Default system name changed to `ByteCola`
- `web/index.html` already uses ByteCola title, descriptions, favicon, apple-touch-icon, and manifest entry points
- Login, Register, Reset Password, and Reset Confirm pages now include a ByteCola branding subtitle
- Home and About now explicitly use `/bytecola.png` as the large branding image
- Footer default attribution is now `Brand experience: ByteCola - Docs: New API Docs`
- Runtime favicon override logic was removed from `PageLayout.jsx`

Branding assets are available:

- `web/public/logo.png`
- `web/public/bytecola.png`
- `web/public/bytecola-logo-primary.png`
- `web/public/bytecola-logo-mark.png`
- `web/public/bytecola-logo-app-icon.png`
- `web/public/favicon.ico`
- `web/public/favicon-32x32.png`
- `web/public/favicon-16x16.png`
- `web/public/apple-touch-icon.png`
- `web/public/android-chrome-192x192.png`
- `web/public/android-chrome-512x512.png`
- `web/public/site.webmanifest`

Branding content sources are available:

- `docs/branding/bytecola-about.md`
- `docs/branding/bytecola-footer.html`
- `docs/branding/bytecola-user-agreement.md`
- `docs/branding/bytecola-privacy-policy.md`
- `docs/branding/bytecola-brand-kit.md`

Implementation rules:

- shared UI logo still defaults to `getLogo()` with fallback `/logo.png`
- Home and About large visuals explicitly use `/bytecola.png`
- browser / PWA icons must be controlled by `web/index.html` and `web/public/site.webmanifest`, not by `PageLayout.jsx`

Current blocker:

- `vite build` fails with:
  - `Missing "./dist/css/semi.css" specifier in "@douyinfe/semi-ui" package`
- `npm install` required:
  - `npm install --legacy-peer-deps`

Already validated:

- local ESLint syntax check passed for:
  - `src/pages/Home/index.jsx`
  - `src/pages/About/index.jsx`
  - `src/components/layout/Footer.jsx`
  - `src/components/layout/PageLayout.jsx`

Next:

- convert `docs/branding` content into backend-ready pasteable config values
- continue removing old brand wording in settings and technical hints
- debug the frontend production build issue only if needed for release
