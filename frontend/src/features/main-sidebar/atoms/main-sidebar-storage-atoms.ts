import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const STORAGE_KEY_MAIN_SIDEBAR_OPEN = 'polarshell:main-sidebar-open';

const mainSidebarOpenStorage = createJSONStorage<boolean>(() => localStorage);

/** Sidebar expanded (true) or collapsed to icon rail (false). */
export const mainSidebarOpenAtom = atomWithStorage<boolean>(
  STORAGE_KEY_MAIN_SIDEBAR_OPEN,
  true,
  mainSidebarOpenStorage,
);
