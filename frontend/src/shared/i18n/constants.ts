export const LANGUAGE_STORAGE_KEY = 'polarshell:language';

export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = 'es';

export const FALLBACK_LANGUAGE: AppLanguage = 'en';

export const defaultNS = 'translation' as const;
