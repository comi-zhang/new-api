export interface BrandMeta {
  description: string
  themeColor: string
  favicon: string
  manifest: string
  appleTouchIcon: string
}

export interface BrandHeroContent {
  titleLeading: string
  titleHighlight: string
  description: string
}

export interface BrandProfile {
  id: string
  displayName: string
  systemName: string
  defaultLogo: string
  primaryLogo: string
  logoMark: string
  wordmark: string
  tagline: string
  primaryColor: string
  accentColor: string
  supportEmail: string
  domain: string
  defaultAboutMarkdown: string
  defaultFooterHtml: string
  meta: BrandMeta
  hero: BrandHeroContent
}
