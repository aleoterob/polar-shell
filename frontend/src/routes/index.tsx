import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '@/features/app/components/app-layout';
import { HomePage } from '@/features/app/components/home-page';

export const Route = createFileRoute('/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}
