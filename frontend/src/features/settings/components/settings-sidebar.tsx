import { useAtom } from 'jotai';
import { SettingsBackButton } from '@/features/settings/components/settings-back-button';
import {
  settingsSectionAtom,
  type SettingsSection,
} from '@/features/settings/atoms/settings-atoms';
import { SidebarMenuButton } from '@/shared/components/ui/sidebar';
import { Globe, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SETTINGS_SIDEBAR_WIDTH = '15rem';

const settingsSidebarButtonClassName =
  'inline-flex h-8 w-full cursor-pointer items-center justify-start gap-2 pl-2 pr-2.5';

export function SettingsSidebar() {
  const { t } = useTranslation();
  const [section, setSection] = useAtom(settingsSectionAtom);

  const selectSection = (nextSection: SettingsSection) => {
    setSection(nextSection);
  };

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
            isActive={section === 'general'}
            className={settingsSidebarButtonClassName}
            onClick={() => selectSection('general')}
          >
            <Settings className="size-4 shrink-0" />
            <span className="leading-none">{t('settings.general')}</span>
          </SidebarMenuButton>
          <SidebarMenuButton
            type="button"
            isActive={section === 'languages'}
            className={settingsSidebarButtonClassName}
            onClick={() => selectSection('languages')}
          >
            <Globe className="size-4 shrink-0" />
            <span className="leading-none">{t('settings.languages')}</span>
          </SidebarMenuButton>
        </div>
      </div>
    </aside>
  );
}
