import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { TerminalTab } from "@/features/terminal/types/terminal";

const STORAGE_KEY_TABS = "polarshell:tabs";
const STORAGE_KEY_ACTIVE_TAB = "polarshell:active-tab-id";

export type PersistedTab = Pick<TerminalTab, "id" | "title" | "shellId">;

const jsonStorage = createJSONStorage<PersistedTab[]>(() => localStorage);
const activeTabJsonStorage = createJSONStorage<string | null>(
  () => localStorage,
);

export const persistedTabsAtom = atomWithStorage<PersistedTab[]>(
  STORAGE_KEY_TABS,
  [],
  jsonStorage,
);

export const persistedActiveTabIdAtom = atomWithStorage<string | null>(
  STORAGE_KEY_ACTIVE_TAB,
  null,
  activeTabJsonStorage,
);
