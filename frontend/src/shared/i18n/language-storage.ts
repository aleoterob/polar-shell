import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from '@/shared/i18n/constants';

export function getStoredLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (
    stored &&
    SUPPORTED_LANGUAGES.includes(stored as AppLanguage)
  ) {
    return stored as AppLanguage;
  }

  return DEFAULT_LANGUAGE;
}

export function setStoredLanguage(language: AppLanguage): void {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
