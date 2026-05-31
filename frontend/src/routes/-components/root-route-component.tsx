import { Outlet } from '@tanstack/react-router';
import { AppShell } from '@/features/app/components/app-shell';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

export function RootRouteComponent() {
  return (
    <TooltipProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </TooltipProvider>
  );
}
