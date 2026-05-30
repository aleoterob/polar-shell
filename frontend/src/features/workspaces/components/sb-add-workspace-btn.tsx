import { PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/button';

export function SBAddWorkspaceBtn() {
  const { t } = useTranslation();

  return (
    <Button
      variant="supabase"
      size="sm"
      className="ml-auto mr-1.5 h-[26px] w-fit rounded-full px-2 text-[11px] font-normal transform-none pr-3"
    >
      <PlusIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="leading-none">{t('workspaces.addWorkspace')}</span>
    </Button>
  );
}
