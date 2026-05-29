import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/lib/utils';

export function MainSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className={cn('!border-r-0', className)}
      {...props}
    >
      <SidebarHeader className="flex flex-row items-center justify-end p-2 group-data-[collapsible=icon]:justify-center">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent />
    </Sidebar>
  );
}
