import { createRootRoute } from '@tanstack/react-router';
import { RootRouteComponent } from '@/routes/-components/root-route-component';

export const Route = createRootRoute({
  component: RootRouteComponent,
});
