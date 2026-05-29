import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from '@/shared/i18n/constants';
import { setStoredLanguage } from '@/shared/i18n/language-storage';

function normalizeLanguage(language: string): AppLanguage {
  const base = language.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(base as AppLanguage)
    ? (base as AppLanguage)
    : DEFAULT_LANGUAGE;
}

export function useAppLanguage() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);

  const setLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      if (nextLanguage === language) {
        return;
      }
      setStoredLanguage(nextLanguage);
      void i18n.changeLanguage(nextLanguage);
    },
    [i18n, language],
  );

  return { language, setLanguage };
}
