import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  Building2,
  Construction,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Markdown } from '@/components/ui/markdown'
import { Skeleton } from '@/components/ui/skeleton'
import { getActiveBrandProfile, getDefaultAboutMarkdown } from '@/branding'
import { PublicLayout } from '@/components/layout'
import { getAboutContent } from './api'

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isLikelyHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

function AboutHero(props: {
  title: string
  description: string
  logo?: string
  contactEmail?: string
  domain?: string
}) {
  return (
    <section className='grid gap-6 rounded-[28px] border border-slate-200/70 bg-[linear-gradient(135deg,#f8fbff_0%,#fff3f1_55%,#ffffff_100%)] p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.24)] md:grid-cols-[1.4fr_0.8fr] md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#1f2937_100%)]'>
      <div className='space-y-4'>
        <div className='inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700 uppercase dark:border-sky-500/20 dark:bg-white/5 dark:text-sky-300'>
          <Sparkles className='size-3.5' />
          Brand Profile
        </div>
        <div className='space-y-3'>
          <h1 className='text-3xl font-semibold tracking-tight md:text-5xl'>
            {props.title}
          </h1>
          <p className='text-muted-foreground max-w-2xl text-sm leading-7 md:text-base'>
            {props.description}
          </p>
        </div>
      </div>
      <div className='grid gap-4 rounded-3xl border border-white/60 bg-white/75 p-5 backdrop-blur md:self-start dark:border-white/10 dark:bg-white/5'>
        {props.logo && (
          <img
            src={props.logo}
            alt={props.title}
            className='h-10 w-auto object-contain'
          />
        )}
        <div className='space-y-2 text-sm'>
          {props.domain && (
            <div className='text-muted-foreground'>
              <span className='font-medium text-foreground'>Domain</span>
              <div>{props.domain}</div>
            </div>
          )}
          {props.contactEmail && (
            <div className='text-muted-foreground'>
              <span className='font-medium text-foreground'>Contact</span>
              <div className='mt-1 inline-flex items-center gap-2'>
                <Mail className='size-4' />
                {props.contactEmail}
              </div>
            </div>
          )}
        </div>
        <p className='text-muted-foreground text-xs leading-6'>
          New API attribution and upstream project links remain available below
          as project origin information.
        </p>
      </div>
    </section>
  )
}

function AboutQuickFacts(props: {
  title: string
  contactEmail?: string
  domain?: string
}) {
  const facts = [
    {
      label: '品牌定位',
      value: '统一接入、快速启用、稳定交付',
      icon: <Sparkles className='size-4 text-sky-500' />,
    },
    {
      label: '适用场景',
      value: '团队 AI 接入、模型治理、业务交付',
      icon: <Building2 className='size-4 text-violet-500' />,
    },
    {
      label: '项目来源',
      value: '保留 New API / QuantumNous 上游归属信息',
      icon: <ShieldCheck className='size-4 text-emerald-500' />,
    },
  ]

  return (
    <aside className='space-y-4'>
      <div className='rounded-[24px] border border-slate-200/70 bg-white/88 p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/60'>
        <h2 className='text-base font-semibold'>{props.title}</h2>
        <div className='mt-4 space-y-3'>
          {facts.map((fact) => (
            <div
              key={fact.label}
              className='rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5'
            >
              <div className='mb-2 flex items-center gap-2 text-sm font-semibold'>
                {fact.icon}
                {fact.label}
              </div>
              <p className='text-muted-foreground text-sm leading-6'>
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-[24px] border border-slate-200/70 bg-white/88 p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/60'>
        <h2 className='text-base font-semibold'>联系与访问</h2>
        <div className='mt-4 space-y-3 text-sm'>
          {props.domain && (
            <a
              href={`https://${props.domain}`}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 transition-colors hover:border-sky-300 dark:border-white/10 dark:bg-white/5'
            >
              <div>
                <div className='font-medium'>站点域名</div>
                <div className='text-muted-foreground mt-1'>{props.domain}</div>
              </div>
              <ArrowUpRight className='size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </a>
          )}
          {props.contactEmail && (
            <a
              href={`mailto:${props.contactEmail}`}
              className='group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 transition-colors hover:border-rose-300 dark:border-white/10 dark:bg-white/5'
            >
              <div>
                <div className='font-medium'>联系邮箱</div>
                <div className='text-muted-foreground mt-1 inline-flex items-center gap-2'>
                  <Mail className='size-4' />
                  {props.contactEmail}
                </div>
              </div>
              <ArrowUpRight className='size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </a>
          )}
        </div>
      </div>

      <div className='rounded-[24px] border border-slate-200/70 bg-slate-50/85 p-5 text-sm leading-7 shadow-sm dark:border-white/10 dark:bg-white/5'>
        <h2 className='mb-3 text-base font-semibold'>Upstream Attribution</h2>
        <p className='text-muted-foreground'>
          ByteCola 作为下游品牌层展示，项目源头与核心归属仍保留在
          New API 与 QuantumNous。
        </p>
        <a
          href='https://github.com/QuantumNous/new-api'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-flex items-center gap-2 text-sky-600 hover:underline dark:text-sky-300'
        >
          github.com/QuantumNous/new-api
          <ArrowUpRight className='size-3.5' />
        </a>
      </div>
    </aside>
  )
}

function AboutContentSurface(props: {
  children: ReactNode
  isHtml?: boolean
}) {
  return (
    <div className='rounded-[28px] border border-slate-200/70 bg-white/92 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/60 md:p-8'>
      <div className='mb-6 flex flex-wrap items-center gap-2'>
        <span className='rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300'>
          品牌说明
        </span>
        <span className='rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'>
          前端优化渲染
        </span>
      </div>
      <div
        className={
          props.isHtml
            ? 'prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-p:leading-8 prose-li:leading-8'
            : ''
        }
      >
        {props.children}
      </div>
    </div>
  )
}

function EmptyAboutState() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <div className='flex min-h-[60vh] items-center justify-center p-8'>
      <div className='max-w-2xl space-y-6 text-center'>
        <div className='flex justify-center'>
          <Construction className='text-muted-foreground h-24 w-24' />
        </div>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>{t('No About Content Set')}</h2>
          <p className='text-muted-foreground'>
            {t(
              'The administrator has not configured any about content yet. You can set it in the settings page, supporting HTML or URL.'
            )}
          </p>
        </div>
        <div className='space-y-4 text-sm'>
          <p>
            {t('New API Project Repository:')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('https://github.com/QuantumNous/new-api')}
            </a>
          </p>
          <p className='text-muted-foreground'>
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('NewAPI')}
            </a>{' '}
            © {currentYear}{' '}
            <a
              href='https://github.com/QuantumNous'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('QuantumNous')}
            </a>{' '}
            {t('| Based on')}{' '}
            <a
              href='https://github.com/songquanpeng/one-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('One API')}
            </a>{' '}
            © 2023{' '}
            <a
              href='https://github.com/songquanpeng'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('JustSong')}
            </a>
          </p>
          <p className='text-muted-foreground'>
            {t('This project must be used in compliance with the')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api/blob/main/LICENSE'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('AGPL v3.0 License')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: getAboutContent,
  })

  const brandProfile = getActiveBrandProfile()
  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isValidUrl(rawContent)
  const isHtml = hasContent && !isUrl && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    const defaultAboutContent = getDefaultAboutMarkdown()

    if (defaultAboutContent) {
      return (
        <PublicLayout>
          <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8'>
            <AboutHero
              title={brandProfile?.displayName || 'About'}
              description={
                brandProfile?.tagline ||
                'Unified AI gateway and brand profile.'
              }
              logo={
                brandProfile?.primaryLogo ||
                brandProfile?.wordmark ||
                brandProfile?.defaultLogo
              }
              contactEmail={brandProfile?.supportEmail}
              domain={brandProfile?.domain}
            />
            <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]'>
              <AboutContentSurface>
                <Markdown className='max-w-none prose-headings:scroll-mt-20 prose-p:leading-8 prose-li:leading-8 prose-strong:text-foreground prose-h1:text-3xl prose-h2:mt-10 prose-h2:border-t prose-h2:pt-6 prose-ul:pl-5 prose-ol:pl-5'>
                  {defaultAboutContent}
                </Markdown>
              </AboutContentSurface>
              <AboutQuickFacts
                title='Quick Facts'
                contactEmail={brandProfile?.supportEmail}
                domain={brandProfile?.domain}
              />
            </div>
          </div>
        </PublicLayout>
      )
    }

    return (
      <PublicLayout>
        <EmptyAboutState />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={brandProfile?.displayName || t('About')}
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8'>
        {brandProfile && (
          <AboutHero
            title={brandProfile.displayName}
            description={brandProfile.tagline}
            logo={
              brandProfile.primaryLogo ||
              brandProfile.wordmark ||
              brandProfile.defaultLogo
            }
            contactEmail={brandProfile.supportEmail}
            domain={brandProfile.domain}
          />
        )}
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]'>
          <AboutContentSurface isHtml={isHtml}>
            {isHtml ? (
              <div
                className='prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-p:leading-8 prose-li:leading-8'
                dangerouslySetInnerHTML={{ __html: rawContent }}
              />
            ) : (
              <Markdown className='max-w-none prose-headings:scroll-mt-20 prose-p:leading-8 prose-li:leading-8 prose-strong:text-foreground prose-h1:text-3xl prose-h2:mt-10 prose-h2:border-t prose-h2:pt-6 prose-ul:pl-5 prose-ol:pl-5'>
                {rawContent}
              </Markdown>
            )}
          </AboutContentSurface>
          <AboutQuickFacts
            title='Quick Facts'
            contactEmail={brandProfile?.supportEmail}
            domain={brandProfile?.domain}
          />
        </div>
      </div>
    </PublicLayout>
  )
}
