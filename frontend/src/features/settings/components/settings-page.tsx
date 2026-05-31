import { useAtomValue } from 'jotai';
import { LanguagesPanel } from '@/features/settings/components/languages/languages-panel';
import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { settingsSectionAtom } from '@/features/settings/atoms/settings-atoms';
import { SidebarProvider } from '@/shared/components/ui/sidebar';

export function SettingsPage() {
  const section = useAtomValue(settingsSectionAtom);

  return (
    <SidebarProvider className="flex h-full min-h-0 w-full items-stretch">
      <SettingsSidebar />
      <div className="relative flex h-full min-h-0 flex-1 transform-gpu items-start justify-center overflow-auto rounded-tl-lg bg-page-background p-8 shadow-[inset_0.5px_0.5px_0_0_color-mix(in_oklab,var(--muted-foreground)_35%,transparent)]">
        {section === 'languages' ? <LanguagesPanel /> : null}
      </div>
    </SidebarProvider>
  );
}
