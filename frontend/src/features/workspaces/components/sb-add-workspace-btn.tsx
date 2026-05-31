import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/button';

export function SBAddWorkspaceBtn() {
  const { t } = useTranslation();

  return (
    <Button
      render={<Link to="/workspace" preload="render" />}
      variant="supabase"
      size="sm"
      className="h-[25px] w-fit shrink-0 rounded-full px-2 pr-3 text-[11px] font-normal transform-none"
    >
      <PlusIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="leading-none">{t('workspaces.addWorkspace')}</span>
    </Button>
  );
}
