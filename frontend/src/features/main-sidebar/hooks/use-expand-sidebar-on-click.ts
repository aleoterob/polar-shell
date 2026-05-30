import { useSidebar } from '@/shared/components/ui/sidebar';

/** Expands the sidebar when collapsed (shadcn icon rail). */
export function useExpandSidebarOnClick() {
  const { state, isMobile, setOpen } = useSidebar();

  return () => {
    if (state === 'collapsed' && !isMobile) {
      setOpen(true);
    }
  };
}
