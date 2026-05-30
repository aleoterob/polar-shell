import { HoleBackground } from '@/components/animate-ui/components/backgrounds/hole';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <HoleBackground
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
      />
      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col items-center justify-center overflow-auto p-8">
        <div className="-translate-y-16 flex w-full max-w-sm flex-col items-start">
          <div className="settings-languages-title-divider [&::after]:bg-foreground">
            <h1 className="m-0 p-0 font-semibold tracking-tight">
              <div className="flex h-7 items-center gap-2.5">
                <Sparkles className="block size-6 shrink-0" aria-hidden />
                <span className="text-xl leading-none">
                  {t('welcome.title')}
                </span>
              </div>
            </h1>
          </div>
          <p className="m-0 text-sm leading-relaxed text-foreground">
            {t('welcome.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
