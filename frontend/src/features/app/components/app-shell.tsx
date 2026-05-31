import type { ReactNode } from 'react';
import { AppTitleBar } from '@/features/app/components/app-main-top-bar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-svh min-h-0 w-full flex-col overflow-hidden bg-background">
      <AppTitleBar />
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
