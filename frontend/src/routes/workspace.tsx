import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '@/features/app/components/app-layout';
import { WorkspacePage } from '@/features/workspaces/components/workspace-page';

export const Route = createFileRoute('/workspace')({
  component: WorkspaceRoute,
});

function WorkspaceRoute() {
  return (
    <AppLayout>
      <WorkspacePage />
    </AppLayout>
  );
}
