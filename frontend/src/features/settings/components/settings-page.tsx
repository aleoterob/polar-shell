import { SettingsBackButton } from '@/features/settings/components/settings-back-button';
import { SidebarProvider } from '@/shared/components/ui/sidebar';

export function SettingsPage() {
  return (
    <SidebarProvider className="flex h-svh min-h-0 w-full bg-background">
      <div className="p-2">
        <SettingsBackButton />
      </div>
    </SidebarProvider>
  );
}
