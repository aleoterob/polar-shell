import { HoleBackground } from '@/components/animate-ui/components/backgrounds/hole';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-full min-h-0 flex-1 transform-gpu flex-col overflow-hidden rounded-tl-lg shadow-[inset_0.5px_0.5px_0_0_color-mix(in_oklab,var(--muted-foreground)_50%,transparent)]">
      <HoleBackground
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
      />
      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col items-center justify-center overflow-auto p-8">
        <div className="-translate-y-16 flex w-full max-w-sm flex-col items-start">
          <div className="w-full transform-gpu pb-3 shadow-[inset_0_-0.5px_0_0_color-mix(in_oklab,var(--muted-foreground)_50%,transparent)]">
            <h1 className="m-0 p-0 font-semibold tracking-tight">
              <div className="flex h-7 items-center gap-2.5">
                <Sparkles className="block size-6 shrink-0" aria-hidden />
                <span className="text-xl leading-none">
                  {t('welcome.title')}
                </span>
              </div>
            </h1>
          </div>
          <p className="mb-0 mt-2 text-sm leading-relaxed text-foreground">
            {t('welcome.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
