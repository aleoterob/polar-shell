import { MainSidebar } from '@/features/main-sidebar/components/main-sidebar';
import { mainSidebarProviderStyle } from '@/features/main-sidebar/lib/main-sidebar-layout';
import { useMainSidebarState } from '@/features/main-sidebar/hooks/use-main-sidebar-state';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { open: mainSidebarOpen, setOpen: setMainSidebarOpen } =
    useMainSidebarState();

  return (
    <TooltipProvider>
      <SidebarProvider
        open={mainSidebarOpen}
        onOpenChange={setMainSidebarOpen}
        className="flex h-full min-h-0 w-full bg-background"
        style={mainSidebarProviderStyle}
      >
        <MainSidebar />
        <SidebarInset
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-hidden',
            mainSidebarOpen && 'rounded-tl-lg',
          )}
        >
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
