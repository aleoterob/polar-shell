import { FolderCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SidebarGroup, SidebarGroupLabel } from '@/shared/components/ui/sidebar';

export function SBWorkspacesLabel() {
  const { t } = useTranslation();

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel className="h-8 gap-2 px-2 text-xs text-sidebar-foreground [&>svg]:size-[18px]">
        <FolderCode className="shrink-0" />
        <span>{t('workspaces.title')}</span>
      </SidebarGroupLabel>
    </SidebarGroup>
  );
}
