import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getActiveBrandProfile } from '@/branding'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()
  const brandProfile = getActiveBrandProfile()

  return (
    <div className='bg-background relative min-h-svh max-w-none overflow-hidden'>
      <div
        aria-hidden
        className='absolute inset-0 opacity-80'
        style={{
          background: brandProfile
            ? `radial-gradient(circle at top left, ${brandProfile.primaryColor}14 0%, transparent 35%), radial-gradient(circle at bottom right, ${brandProfile.accentColor}14 0%, transparent 40%)`
            : undefined,
        }}
      />
      <Link
        to='/'
        className='absolute top-4 left-4 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative h-8 w-8'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-8 w-8 rounded-full object-cover'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <h1 className='text-xl font-medium'>{systemName}</h1>
        )}
      </Link>
      <div className='container relative z-10 flex min-h-svh items-center py-20'>
        <div className='grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='hidden lg:block'>
            <div className='rounded-[32px] border border-slate-200/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70'>
              {(brandProfile?.primaryLogo || brandProfile?.wordmark) && (
                <img
                  src={brandProfile.primaryLogo || brandProfile.wordmark}
                  alt={brandProfile.displayName}
                  className='mb-6 h-12 w-auto object-contain'
                />
              )}
              <h2 className='text-3xl font-semibold tracking-tight'>
                {brandProfile?.tagline || systemName}
              </h2>
              <p className='text-muted-foreground mt-4 max-w-md text-sm leading-7'>
                使用统一入口接入模型、控制配额、管理密钥与上线策略，让 AI
                服务部署更稳定、更容易维护。
              </p>
              <div className='mt-8 grid gap-4'>
                <div className='rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-4 dark:border-white/10 dark:bg-white/5'>
                  <div className='text-sm font-semibold'>统一控制台</div>
                  <div className='text-muted-foreground mt-1 text-sm'>
                    一个界面管理模型、渠道、密钥和运营配置。
                  </div>
                </div>
                <div className='rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-4 dark:border-white/10 dark:bg-white/5'>
                  <div className='text-sm font-semibold'>稳定交付</div>
                  <div className='text-muted-foreground mt-1 text-sm'>
                    保留上游 New API 能力，同时在下游按你的品牌与业务方式呈现。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto flex w-full max-w-[520px] flex-col justify-center space-y-2'>
            <div className='rounded-[32px] border border-slate-200/70 bg-white/92 px-4 py-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur sm:px-8 dark:border-white/10 dark:bg-slate-950/75'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
