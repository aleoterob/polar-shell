import type { CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import { Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { useExpandSidebarOnClick } from '@/features/main-sidebar/hooks/use-expand-sidebar-on-click';
import { cn } from '@/shared/lib/utils';

/** NOTE: Expanded sidebar width (shadcn default is 16rem). */
export const MAIN_SIDEBAR_WIDTH = '15rem';

export const mainSidebarProviderStyle = {
  '--sidebar-width': MAIN_SIDEBAR_WIDTH,
  '--sidebar-width-mobile': MAIN_SIDEBAR_WIDTH,
} as CSSProperties;

export function MainSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar();
  const expandIfCollapsed = useExpandSidebarOnClick();
  const showSettingsTooltip = state === 'collapsed' && !isMobile;

  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className={cn('!border-r-0', className)}
      {...props}
    >
      <SidebarHeader className="flex flex-row items-center justify-end p-2 group-data-[collapsible=icon]:justify-center">
        <SidebarTrigger onClick={expandIfCollapsed} />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link to="/settings" onClick={expandIfCollapsed} />}
              tooltip={showSettingsTooltip ? 'Settings' : undefined}
              className="cursor-pointer"
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
