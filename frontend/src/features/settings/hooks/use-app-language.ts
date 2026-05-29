import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { appLanguageAtom } from '@/shared/i18n/atoms/atoms';
import type { AppLanguage } from '@/shared/i18n/constants';

export function useAppLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguageAtom] = useAtom(appLanguageAtom);

  const setLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      if (nextLanguage === language) {
        return;
      }
      setLanguageAtom(nextLanguage);
      void i18n.changeLanguage(nextLanguage);
    },
    [i18n, language, setLanguageAtom],
  );

  return { language, setLanguage };
}
