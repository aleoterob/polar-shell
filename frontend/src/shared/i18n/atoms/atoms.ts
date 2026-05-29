import { atomWithStorage } from 'jotai/utils';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from '@/shared/i18n/constants';

function parseStoredLanguage(raw: string | null): AppLanguage | null {
  if (!raw) {
    return null;
  }

  if (SUPPORTED_LANGUAGES.includes(raw as AppLanguage)) {
    return raw as AppLanguage;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'string' &&
      SUPPORTED_LANGUAGES.includes(parsed as AppLanguage)
    ) {
      return parsed as AppLanguage;
    }
  } catch {
    return null;
  }

  return null;
}

const appLanguageStorage = {
  getItem: (key: string, initialValue: AppLanguage): AppLanguage => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return parseStoredLanguage(localStorage.getItem(key)) ?? initialValue;
  },
  setItem: (key: string, value: AppLanguage): void => {
    localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};

export const appLanguageAtom = atomWithStorage<AppLanguage>(
  LANGUAGE_STORAGE_KEY,
  DEFAULT_LANGUAGE,
  appLanguageStorage,
);

export function readStoredAppLanguage(): AppLanguage {
  return appLanguageStorage.getItem(LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE);
}
