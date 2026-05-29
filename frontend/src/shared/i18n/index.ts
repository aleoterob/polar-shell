import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import {
  defaultNS,
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '@/shared/i18n/constants';
import { readStoredAppLanguage } from '@/shared/i18n/atoms/atoms';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: readStoredAppLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  ns: [defaultNS],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export { i18n };
export default i18n;
