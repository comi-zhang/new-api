import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getActiveBrandProfile } from '@/branding'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandProfile = getActiveBrandProfile()
  const titleLeading =
    brandProfile?.hero.titleLeading || t('Unified API Gateway for')
  const titleHighlight =
    brandProfile?.hero.titleHighlight || t('All Your AI Models')
  const description =
    brandProfile?.hero.description ||
    `${systemName} ${t(
      'is an open-source AI API gateway for self-hosted deployments. Connect multiple upstream services, manage models, keys, quotas, logs, and routing policies in one place.'
    )}`
  const isBranded = Boolean(brandProfile)

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      {/* Radial gradient background */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]'
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 20% 20%, oklch(0.72 0.18 250 / 80%) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 15%, oklch(0.65 0.15 200 / 60%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 40% 80%, oklch(0.70 0.12 280 / 40%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.08]'
      />

      <div className='flex max-w-5xl flex-col items-center text-center'>
        {isBranded && (
          <div
            className='landing-animate-fade-up mb-6 inline-flex items-center gap-3 rounded-full border px-3 py-2 text-xs font-medium backdrop-blur-sm'
            style={{
              animationDelay: '0ms',
              borderColor: `${brandProfile.primaryColor}25`,
              backgroundColor: `${brandProfile.primaryColor}10`,
              color: brandProfile.primaryColor,
            }}
          >
            <img
              src={brandProfile.defaultLogo}
              alt={brandProfile.displayName}
              className='size-5 rounded-full object-cover'
            />
            <span>{brandProfile.tagline}</span>
            <span className='rounded-full bg-white/70 px-2 py-0.5 text-[11px] text-slate-600'>
              Powered by New API
            </span>
          </div>
        )}
        <h1
          className='landing-animate-fade-up text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.15] font-bold tracking-tight'
          style={{ animationDelay: '60ms' }}
        >
          {titleLeading}
          <br />
          <span className='bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent'>
            {titleHighlight}
          </span>
        </h1>
        <p
          className='landing-animate-fade-up text-muted-foreground/80 mt-5 max-w-lg text-base leading-relaxed opacity-0 md:text-lg'
          style={{ animationDelay: '120ms' }}
        >
          {description}
        </p>
        {isBranded && (
          <div
            className='landing-animate-fade-up mt-6 grid w-full max-w-3xl gap-3 opacity-0 md:grid-cols-3'
            style={{ animationDelay: '170ms' }}
          >
            <div className='border-border/60 bg-background/70 rounded-2xl border px-4 py-4 text-left shadow-sm backdrop-blur'>
              <div className='mb-2 flex items-center gap-2 text-sm font-semibold'>
                <Zap className='size-4 text-sky-500' />
                统一入口
              </div>
              <p className='text-muted-foreground text-sm leading-6'>
                一个控制台管理多家模型渠道、路由策略与调用配额。
              </p>
            </div>
            <div className='border-border/60 bg-background/70 rounded-2xl border px-4 py-4 text-left shadow-sm backdrop-blur'>
              <div className='mb-2 flex items-center gap-2 text-sm font-semibold'>
                <Sparkles className='size-4 text-rose-500' />
                快速上线
              </div>
              <p className='text-muted-foreground text-sm leading-6'>
                减少重复接线与手工配置，把 AI 能力更快交付给业务。
              </p>
            </div>
            <div className='border-border/60 bg-background/70 rounded-2xl border px-4 py-4 text-left shadow-sm backdrop-blur'>
              <div className='mb-2 flex items-center gap-2 text-sm font-semibold'>
                <ArrowRight className='size-4 text-violet-500' />
                稳定运营
              </div>
              <p className='text-muted-foreground text-sm leading-6'>
                通过日志、配额和权限管理，把模型接入变成可维护的系统。
              </p>
            </div>
          </div>
        )}
        <div
          className='landing-animate-fade-up mt-8 flex items-center gap-3 opacity-0'
          style={{ animationDelay: '220ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='group rounded-lg'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='group rounded-lg'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                render={<Link to='/pricing' />}
              >
                {t('View Pricing')}
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className='landing-animate-fade-up w-full opacity-0'
        style={{ animationDelay: '320ms' }}
      >
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
