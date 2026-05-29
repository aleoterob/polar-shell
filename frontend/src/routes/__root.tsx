import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

export const Route = createRootRoute({
  component: RootRoute,
});

function RootRoute() {
  return (
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
  );
}
