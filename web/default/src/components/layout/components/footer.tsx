import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { getActiveBrandProfile, getDefaultFooterHtml } from '@/branding'
import { useSystemConfig } from '@/hooks/use-system-config'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: string
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  className?: string
}

const NEW_API_FOOTER_ATTRIBUTION_KEY = [
  'footer',
  'new' + 'api',
  'projectAttributionSuffix',
].join('.')

function FooterLinkItem(props: { link: FooterLink }) {
  const { t } = useTranslation()
  const isExternal = props.link.href.startsWith('http')
  const label = t(props.link.text)

  if (isExternal) {
    return (
      <a
        href={props.link.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      to={props.link.href}
      className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
    >
      {label}
    </Link>
  )
}

function ProjectAttribution(props: { currentYear: number }) {
  const { t } = useTranslation()

  return (
    <div className='text-muted-foreground/45 text-center text-xs sm:text-right'>
      <span className='text-muted-foreground/45'>
        &copy; {props.currentYear}{' '}
        <a
          href='https://github.com/QuantumNous/new-api'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground/70 hover:text-foreground font-medium transition-colors'
        >
          {t('New API')}
        </a>
        . {t(NEW_API_FOOTER_ATTRIBUTION_KEY)}
      </span>
    </div>
  )
}

export function Footer(props: FooterProps) {
  const { t } = useTranslation()
  const {
    systemName,
    logo: systemLogo,
    footerHtml,
    docsLink,
    demoSiteEnabled,
  } = useSystemConfig()
  const brandProfile = getActiveBrandProfile()

  const displayLogo = systemLogo || props.logo || '/logo.png'
  const displayName = systemName || props.name || 'New API'
  const resolvedDocsLink = docsLink || 'https://doc.newapi.pro'
  const isDemoSiteMode = Boolean(demoSiteEnabled)
  const currentYear = new Date().getFullYear()

  const fallbackColumns = useMemo<FooterColumnProps[]>(
    () => [
      {
        title: t('footer.columns.about.title'),
        links: [
          {
            text: t('footer.columns.about.links.aboutProject'),
            href: 'https://doc.newapi.pro/wiki/project-introduction/',
          },
          {
            text: t('footer.columns.about.links.contact'),
            href: 'https://doc.newapi.pro/support/community-interaction/',
          },
          {
            text: t('footer.columns.about.links.features'),
            href: 'https://doc.newapi.pro/wiki/features-introduction/',
          },
        ],
      },
      {
        title: t('footer.columns.docs.title'),
        links: [
          {
            text: t('footer.columns.docs.links.quickStart'),
            href: 'https://doc.newapi.pro/getting-started/',
          },
          {
            text: t('footer.columns.docs.links.installation'),
            href: 'https://doc.newapi.pro/installation/',
          },
          {
            text: t('footer.columns.docs.links.apiDocs'),
            href: 'https://doc.newapi.pro/api/',
          },
        ],
      },
      {
        title: t('footer.columns.related.title'),
        links: [
          {
            text: t('footer.columns.related.links.oneApi'),
            href: 'https://github.com/songquanpeng/one-api',
          },
          {
            text: t('footer.columns.related.links.midjourney'),
            href: 'https://github.com/novicezk/midjourney-proxy',
          },
          {
            text: t('footer.columns.related.links.neko'),
            href: 'https://github.com/Calcium-Ion/neko-api-key-tool',
          },
        ],
      },
    ],
    [t]
  )

  const displayColumns = props.columns ?? fallbackColumns
  const resolvedFooterHtml =
    footerHtml || (!brandProfile ? getDefaultFooterHtml() : '')

  if (brandProfile && !footerHtml) {
    const brandColumns: FooterColumnProps[] = [
      {
        title: '平台',
        links: [
          { text: '关于 ByteCola', href: '/about' },
          { text: '模型广场', href: '/pricing' },
          { text: '控制台', href: '/dashboard' },
        ],
      },
      {
        title: '支持',
        links: [
          { text: brandProfile.domain, href: `https://${brandProfile.domain}` },
          {
            text: brandProfile.supportEmail,
            href: `mailto:${brandProfile.supportEmail}`,
          },
          { text: '隐私政策', href: '/privacy-policy' },
        ],
      },
      {
        title: '来源',
        links: [
          {
            text: 'New API GitHub',
            href: 'https://github.com/QuantumNous/new-api',
          },
          {
            text: '用户协议',
            href: '/user-agreement',
          },
          {
            text: '文档入口',
            href: resolvedDocsLink,
          },
        ],
      },
    ]

    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto max-w-6xl px-6 py-14 md:py-16'>
          <div className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
            <div className='rounded-[28px] border border-slate-200/70 bg-[linear-gradient(135deg,#f8fbff_0%,#fff4f1_55%,#ffffff_100%)] p-6 shadow-sm dark:border-white/10 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#1f2937_100%)] md:p-7'>
              <Link to='/' className='group flex items-center gap-3'>
                <img
                  src={displayLogo}
                  alt={displayName}
                  className='size-10 rounded-xl object-contain'
                />
                <div>
                  <div className='text-base font-semibold tracking-tight'>
                    {displayName}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {brandProfile.tagline}
                  </div>
                </div>
              </Link>
              <p className='text-muted-foreground mt-5 max-w-xl text-sm leading-7'>
                ByteCola 聚焦于把模型接入、访问治理和交付链路整理成更可维护的产品能力，
                让团队能以更低的沟通成本把 AI 服务稳定交付出去。
              </p>
              <div className='mt-5 flex flex-wrap gap-2'>
                {['统一入口', '接入治理', '稳定交付'].map((item) => (
                  <span
                    key={item}
                    className='border-border/50 bg-background/75 rounded-full border px-3 py-1.5 text-xs'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
              {brandColumns.map((column) => (
                <div
                  key={column.title}
                  className='rounded-[24px] border border-slate-200/70 bg-white/88 p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/60'
                >
                  <p className='text-muted-foreground/60 mb-3 text-xs font-medium tracking-widest uppercase'>
                    {column.title}
                  </p>
                  <ul className='space-y-2.5'>
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.href}`}>
                        <FooterLinkItem link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className='border-border/30 mt-8 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between'>
            <p className='text-muted-foreground/50 text-sm'>
              &copy; {currentYear} {displayName}. 保留所有权利。
            </p>
            <ProjectAttribution currentYear={currentYear} />
          </div>
        </div>
      </footer>
    )
  }

  if (resolvedFooterHtml) {
    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto w-full max-w-6xl px-6 py-5'>
          <div className='bg-muted/20 border-border/50 flex flex-col items-center justify-between gap-4 rounded-2xl border px-4 py-4 backdrop-blur-sm sm:flex-row sm:px-5'>
            <div
              className='custom-footer text-muted-foreground min-w-0 text-center text-sm sm:text-left'
              dangerouslySetInnerHTML={{ __html: resolvedFooterHtml }}
            />
            <div className='border-border/60 w-full border-t pt-4 sm:w-auto sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5'>
              <ProjectAttribution currentYear={currentYear} />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-6xl px-6 py-12 md:py-16'>
        <div className='flex flex-col justify-between gap-10 md:flex-row md:gap-16'>
          {/* Brand column */}
          <div className='shrink-0'>
            <Link to='/' className='group flex items-center gap-2.5'>
              <img
                src={displayLogo}
                alt={displayName}
                className='size-7 rounded-lg object-contain'
              />
              <span className='text-sm font-semibold tracking-tight'>
                {displayName}
              </span>
            </Link>
            <p className='text-muted-foreground/60 mt-3 max-w-[200px] text-xs leading-relaxed'>
              {t('Powerful API Management Platform')}
            </p>
          </div>

          {/* Links columns */}
          {isDemoSiteMode && (
            <div className='grid grid-cols-3 gap-8 md:gap-16'>
              {displayColumns.map((column, index) => (
                <div key={index}>
                  <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                    {t(column.title)}
                  </p>
                  <ul className='space-y-2.5'>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <FooterLinkItem link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className='border-border/30 mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row'>
          <p className='text-muted-foreground/40 text-xs'>
            &copy; {currentYear} {displayName}.{' '}
            {props.copyright ?? t('footer.defaultCopyright')}
          </p>
          <ProjectAttribution currentYear={currentYear} />
        </div>
      </div>
    </footer>
  )
}
