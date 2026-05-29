import 'i18next';
import type es from '@/locales/es.json';
import type { defaultNS } from '@/shared/i18n/constants';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: typeof es;
    };
  }
}
