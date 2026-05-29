import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageOptionCard } from '@/features/settings/components/languages/language-option-card';
import { useAppLanguage } from '@/features/settings/hooks/use-app-language';
import type { AppLanguage } from '@/shared/i18n/constants';
import { RadioGroup } from '@/shared/components/ui/radio-group';

const LANGUAGE_LABEL_KEYS: Record<AppLanguage, 'settings.languageSpanish' | 'settings.languageEnglish'> = {
  es: 'settings.languageSpanish',
  en: 'settings.languageEnglish',
};

const LANGUAGE_INPUT_IDS: Record<AppLanguage, string> = {
  es: 'app-language-es',
  en: 'app-language-en',
};

const LANGUAGE_DISPLAY_ORDER: AppLanguage[] = ['en', 'es'];

export function LanguagesPanel() {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();

  return (
    <div className="flex w-full max-w-sm flex-col items-start">
      <h1 className="m-0 p-0 font-semibold tracking-tight">
        <div className="flex h-7 items-center gap-2.5">
          <Globe className="block size-6 shrink-0" aria-hidden />
          <span className="text-xl leading-none">{t('settings.languages')}</span>
        </div>
      </h1>

      <RadioGroup
        value={language}
        onValueChange={(value) => {
          if (typeof value === 'string') {
            setLanguage(value as AppLanguage);
          }
        }}
        className="mt-10 flex w-full flex-row flex-wrap items-stretch justify-center gap-5"
      >
        {LANGUAGE_DISPLAY_ORDER.map((lang) => (
          <LanguageOptionCard
            key={lang}
            language={lang}
            isActive={language === lang}
            label={t(LANGUAGE_LABEL_KEYS[lang])}
            inputId={LANGUAGE_INPUT_IDS[lang]}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
