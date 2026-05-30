import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/features/app/components/app-layout';
import { WelcomePage } from '@/features/welcome/components/welcome-page';
import { hasPersistedWorkspaces } from '@/features/workspaces/lib/get-persisted-workspaces';

export const Route = createFileRoute('/welcome')({
  beforeLoad: () => {
    if (hasPersistedWorkspaces()) {
      throw redirect({ to: '/' });
    }
  },
  component: WelcomeRoute,
});

function WelcomeRoute() {
  return (
    <AppLayout>
      <WelcomePage />
    </AppLayout>
  );
}
