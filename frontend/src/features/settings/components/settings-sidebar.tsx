import { SettingsBackButton } from '@/features/settings/components/settings-back-button';
import { SidebarMenuButton } from '@/shared/components/ui/sidebar';
import { Globe, Settings } from 'lucide-react';

const SETTINGS_SIDEBAR_WIDTH = '15rem';

const settingsSidebarButtonClassName =
  'inline-flex h-8 w-full cursor-pointer items-center justify-start gap-2 pl-2 pr-2.5';

export function SettingsSidebar() {
  return (
    <aside
      className="flex h-full shrink-0 flex-col bg-settings-sidebar-background"
      style={{ width: SETTINGS_SIDEBAR_WIDTH }}
    >
      <div className="flex flex-col p-2">
        <SettingsBackButton />
        <div className="flex w-full flex-col gap-0 bg-transparent pt-4">
          <SidebarMenuButton
            type="button"
            className={settingsSidebarButtonClassName}
          >
            <Settings className="size-4 shrink-0" />
            <span className="leading-none">General</span>
          </SidebarMenuButton>
          <SidebarMenuButton
            type="button"
            className={settingsSidebarButtonClassName}
          >
            <Globe className="size-4 shrink-0" />
            <span className="leading-none">Idiomas</span>
          </SidebarMenuButton>
        </div>
      </div>
    </aside>
  );
}
