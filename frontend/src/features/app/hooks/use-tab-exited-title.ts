import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useTabExitedTitle() {
  const { t } = useTranslation();

  return useCallback(
    (title: string) => t('app.tabExited', { title }),
    [t],
  );
}
