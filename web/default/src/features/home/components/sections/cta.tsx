import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getActiveBrandProfile } from '@/branding'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()
  const brandProfile = getActiveBrandProfile()
  const isBranded = Boolean(brandProfile)

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 overflow-hidden px-6 py-24 md:py-32'>
      {/* Gradient mesh background */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 opacity-20 dark:opacity-[0.08]'
        style={{
          background: [
            'radial-gradient(ellipse 50% 50% at 30% 50%, oklch(0.7 0.15 250 / 70%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 70% 40%, oklch(0.65 0.12 200 / 50%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <AnimateInView
        className='mx-auto max-w-2xl text-center'
        animation='scale-in'
      >
        <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-4xl'>
          {isBranded ? (
            <>
              让模型接入更少阻力
              <br />
              <span className='bg-gradient-to-r from-sky-500 via-blue-500 to-rose-500 bg-clip-text text-transparent'>
                让交付上线更快发生
              </span>
            </>
          ) : (
            <>
              {t('Ready to simplify')}
              <br />
              <span className='bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent'>
                {t('your AI integration?')}
              </span>
            </>
          )}
        </h2>
        <p className='text-muted-foreground/80 mx-auto mt-5 max-w-md text-sm leading-relaxed md:text-base'>
          {isBranded
            ? 'ByteCola 以统一入口承接模型能力、访问控制和运营策略，同时保留上游 New API 的核心能力与归属信息。'
            : t(
                'Deploy your own gateway and start routing requests through your configured upstream services.'
              )}
        </p>
        {isBranded && (
          <div className='text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-2 text-xs'>
            {['统一入口', '策略治理', '稳定交付'].map((item) => (
              <span
                key={item}
                className='border-border/50 bg-background/80 rounded-full border px-3 py-1.5'
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Button className='group rounded-lg' render={<Link to='/sign-up' />}>
            {isBranded ? '开始接入' : t('Get Started')}
            <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
          <Button
            variant='outline'
            className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
            render={<Link to={isBranded ? '/about' : '/pricing'} />}
          >
            {isBranded ? '了解品牌说明' : t('View Pricing')}
          </Button>
        </div>
      </AnimateInView>
    </section>
  )
}
