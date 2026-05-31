import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SidebarMenuButton } from '@/shared/components/ui/sidebar';

export function SettingsBackButton() {
  const { t } = useTranslation();

  return (
    <SidebarMenuButton
      render={<Link to="/" preload="render" />}
      className="inline-flex h-8 w-full cursor-pointer items-center justify-start gap-2 pl-2 pr-2.5"
    >
      <ArrowLeft className="size-4 shrink-0" />
      <span className="leading-none">{t('settings.backToApp')}</span>
    </SidebarMenuButton>
  );
}
