import type { CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { state, isMobile } = useSidebar();
  const expandIfCollapsed = useExpandSidebarOnClick();
  const isIconCollapsed = state === 'collapsed' && !isMobile;
  const showSettingsTooltip = isIconCollapsed;

  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className={cn('!border-r-0', className)}
      {...props}
    >
      <SidebarHeader
        className={cn(
          'flex flex-row items-center gap-2 p-2',
          'group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-1.5',
        )}
      >
        <button
          type="button"
          onClick={expandIfCollapsed}
          className={cn(
            'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md border-0 bg-transparent p-0 text-left',
            'group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:justify-center',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
            isIconCollapsed && 'cursor-pointer',
          )}
        >
          <div className="flex items-center gap-2 pl-1">
            <img
              src="/react-dark.svg"
              alt=""
              aria-hidden
              className="block size-5 shrink-0 self-center animate-[spin_12s_linear_infinite]"
            />
            <span className="-translate-y-px truncate text-[13px] font-medium leading-none group-data-[collapsible=icon]:hidden">
              PolarShell
            </span>
          </div>
        </button>
        <SidebarTrigger
          onClick={expandIfCollapsed}
          className="shrink-0 group-data-[collapsible=icon]:self-center"
        />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link to="/settings" onClick={expandIfCollapsed} />}
              tooltip={
                showSettingsTooltip ? t('mainSidebar.settings') : undefined
              }
              className="cursor-pointer"
            >
              <Settings />
              <span>{t('mainSidebar.settings')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
