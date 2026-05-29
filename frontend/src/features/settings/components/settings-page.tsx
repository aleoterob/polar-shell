import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { SidebarProvider } from '@/shared/components/ui/sidebar';

export function SettingsPage() {
  return (
    <SidebarProvider className="flex h-svh min-h-0 w-full">
      <SettingsSidebar />
      <div className="min-h-0 flex-1 bg-background" />
    </SidebarProvider>
  );
}
