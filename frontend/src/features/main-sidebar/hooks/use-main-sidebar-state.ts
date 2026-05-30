import { useAtom } from 'jotai';
import { mainSidebarOpenAtom } from '@/features/main-sidebar/atoms/main-sidebar-storage-atoms';

export function useMainSidebarState() {
  const [open, setOpen] = useAtom(mainSidebarOpenAtom);

  return {
    open,
    setOpen,
  };
}
