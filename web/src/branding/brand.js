/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

export const BRAND_CONFIG = Object.freeze({
  brandName: 'ByteCola',
  shortName: 'ByteCola',
  tagline: '让 AI 像可乐一样即开即用',
  englishTagline: 'AI, open and ready like cola.',
  description:
    '统一接入、快速启用、稳定分发，只需替换模型基地址即可开始使用 AI。',
  primaryColor: '#1494D1',
  accentColor: '#DB0D18',
  themeColor: '#F5F5F7',
  backgroundColor: '#F7F4F1',
  logo: '/logo.png',
  wordmark: '/bytecola.png',
  primaryLogo: '/bytecola-logo-primary.png',
  logoMark: '/bytecola-logo-mark.png',
  appIcon: '/bytecola-logo-app-icon.png',
  socialShareImage: '/bytecola-logo-app-icon.png',
  domain: 'bytecola.cn',
  contactEmail: 'comizhang@outlook.com',
  supportEmail: 'comizhang@outlook.com',
  docsLink: 'https://docs.newapi.pro/',
  generator: 'bytecola',
  faviconSet: Object.freeze({
    ico: '/favicon.ico',
    png16: '/favicon-16x16.png',
    png32: '/favicon-32x32.png',
    appleTouchIcon: '/apple-touch-icon.png',
    manifest: '/site.webmanifest',
    android192: '/android-chrome-192x192.png',
    android512: '/android-chrome-512x512.png',
  }),
  home: Object.freeze({
    badge: 'ByteCola',
    heroLogo: '/bytecola.png',
    heroTitle: '让 AI 像可乐一样即开即用',
    heroSubtitle: '统一接入、快速启用、稳定分发，只需将模型基地址替换为：',
    primaryCta: '获取密钥',
    docsCta: '文档',
    providerTitle: '支持众多的大模型供应商',
  }),
  footer: Object.freeze({
    primaryText: '品牌与体验：ByteCola',
    docsPrefix: '文档支持：',
    copyrightSuffix: '版权所有',
    docsAttributionLabel: 'New API Docs',
    sections: Object.freeze([
      {
        title: '关于我们',
        links: Object.freeze([
          {
            label: '关于项目',
            href: 'https://docs.newapi.pro/wiki/project-introduction/',
          },
          {
            label: '联系我们',
            href: 'https://docs.newapi.pro/support/community-interaction/',
          },
          {
            label: '功能特性',
            href: 'https://docs.newapi.pro/wiki/features-introduction/',
          },
        ]),
      },
      {
        title: '文档',
        links: Object.freeze([
          {
            label: '快速开始',
            href: 'https://docs.newapi.pro/getting-started/',
          },
          {
            label: '安装指南',
            href: 'https://docs.newapi.pro/installation/',
          },
          {
            label: 'API 文档',
            href: 'https://docs.newapi.pro/api/',
          },
        ]),
      },
      {
        title: '相关项目',
        links: Object.freeze([
          {
            label: 'One API',
            href: 'https://github.com/songquanpeng/one-api',
          },
          {
            label: 'Midjourney-Proxy',
            href: 'https://github.com/novicezk/midjourney-proxy',
          },
          {
            label: 'neko-api-key-tool',
            href: 'https://github.com/Calcium-Ion/neko-api-key-tool',
          },
        ]),
      },
      {
        title: '友情链接',
        links: Object.freeze([
          {
            label: 'new-api-horizon',
            href: 'https://github.com/Calcium-Ion/new-api-horizon',
          },
          {
            label: 'CoAI',
            href: 'https://github.com/coaidev/coai',
          },
          {
            label: 'GPT-Load',
            href: 'https://www.gpt-load.com/',
          },
        ]),
      },
    ]),
  }),
});

export function buildDefaultAboutMarkdown(brand = BRAND_CONFIG) {
  return `# 关于 ${brand.brandName}

**${brand.brandName}，${brand.tagline}。**

${brand.brandName} 致力于把 AI 的接入、调用与运营体验做得更直接、更顺手。我们相信，真正好用的 AI 产品不应该让团队把时间浪费在复杂接线、重复配置和碎片化管理上，而应该像打开一瓶可乐一样，开盖就能用、入口统一、体验稳定。

## 我们在做什么

${brand.brandName} 提供统一、轻量、可运营的 AI 接入体验，帮助个人开发者、产品团队和企业组织：

- 用一个入口接入多种 AI 能力
- 更快完成模型接入与业务上线
- 统一管理访问、调用与交付流程
- 在运营、产品与工程之间建立更顺滑的协作方式

## 我们坚持什么

- **即开即用**：减少不必要的配置门槛，让 AI 更快投入实际使用。
- **稳定可靠**：把连续可用、响应稳定和清晰反馈放在第一位。
- **简洁清楚**：界面、文案和交互都应该让用户一眼看懂下一步。
- **持续进化**：随着模型能力和用户场景变化，保持产品可扩展、可运营。

## 联系我们

- 品牌名称：${brand.brandName}
- 联系邮箱：\`${brand.contactEmail}\`
- 商务合作：\`${brand.supportEmail}\`
- 生效页面域名：\`${brand.domain}\``;
}

export function resolveBrandConfig(status = {}) {
  const resolved = {
    ...BRAND_CONFIG,
    brandName: status.system_name || BRAND_CONFIG.brandName,
    shortName: status.system_name || BRAND_CONFIG.shortName,
    tagline: status.brand_tagline || BRAND_CONFIG.tagline,
    primaryColor: status.primary_color || BRAND_CONFIG.primaryColor,
    accentColor: status.accent_color || BRAND_CONFIG.accentColor,
    themeColor: status.theme_color || BRAND_CONFIG.themeColor,
    logo: status.logo || BRAND_CONFIG.logo,
    wordmark: status.hero_logo || BRAND_CONFIG.wordmark,
    domain: status.brand_domain || BRAND_CONFIG.domain,
    contactEmail: status.contact_email || BRAND_CONFIG.contactEmail,
    supportEmail: status.support_email || BRAND_CONFIG.supportEmail,
    docsLink: status.docs_link || BRAND_CONFIG.docsLink,
    socialShareImage:
      status.social_share_image || BRAND_CONFIG.socialShareImage,
  };

  resolved.home = {
    ...BRAND_CONFIG.home,
    badge: resolved.shortName,
    heroLogo: status.hero_logo || BRAND_CONFIG.home.heroLogo,
    heroTitle: status.hero_title || resolved.tagline,
    heroSubtitle: status.hero_subtitle || BRAND_CONFIG.home.heroSubtitle,
  };

  resolved.about = {
    defaultMarkdown:
      status.about_default_markdown || buildDefaultAboutMarkdown(resolved),
  };

  return resolved;
}
