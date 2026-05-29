import { useAtomValue } from 'jotai';
import { LanguagesPanel } from '@/features/settings/components/languages/languages-panel';
import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { settingsSectionAtom } from '@/features/settings/atoms/atoms';
import { SidebarProvider } from '@/shared/components/ui/sidebar';

export function SettingsPage() {
  const section = useAtomValue(settingsSectionAtom);

  return (
    <SidebarProvider className="flex h-svh min-h-0 w-full">
      <SettingsSidebar />
      <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto bg-background p-8">
        {section === 'languages' ? <LanguagesPanel /> : null}
      </div>
    </SidebarProvider>
  );
}
