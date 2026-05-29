import {
  MainSidebar,
  mainSidebarProviderStyle,
} from '@/features/main-sidebar/components/main-sidebar';
import { useMainSidebarState } from '@/features/main-sidebar/hooks/use-main-sidebar-state';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { open: mainSidebarOpen, setOpen: setMainSidebarOpen } =
    useMainSidebarState();

  return (
    <TooltipProvider>
      <SidebarProvider
        open={mainSidebarOpen}
        onOpenChange={setMainSidebarOpen}
        className="flex h-svh min-h-0 w-full bg-background"
        style={mainSidebarProviderStyle}
      >
        <MainSidebar />
        <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
