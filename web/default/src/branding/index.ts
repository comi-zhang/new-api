import { bytecolaBrandProfile } from './profiles/bytecola'
import type { BrandProfile } from './types'

declare const __BRAND_PROFILE__: string | undefined

const profiles: Record<string, BrandProfile> = {
  bytecola: bytecolaBrandProfile,
}

function getActiveProfileId() {
  // This downstream worktree is intended to present the ByteCola brand layer
  // by default, while still keeping upstream attribution elsewhere in the UI.
  return (__BRAND_PROFILE__ || 'bytecola').trim().toLowerCase()
}

export function getActiveBrandProfile(): BrandProfile | null {
  const profileId = getActiveProfileId()
  return profiles[profileId] || null
}

export function getDefaultSystemName() {
  return getActiveBrandProfile()?.systemName || 'New API'
}

export function getDefaultLogo() {
  return getActiveBrandProfile()?.defaultLogo || '/logo.png'
}

export function getDefaultFavicon() {
  return getActiveBrandProfile()?.meta.favicon || getDefaultLogo()
}

export function getDefaultAboutMarkdown() {
  return getActiveBrandProfile()?.defaultAboutMarkdown || ''
}

export function getDefaultFooterHtml() {
  return getActiveBrandProfile()?.defaultFooterHtml || ''
}
