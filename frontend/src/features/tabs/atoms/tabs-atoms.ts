import { atom } from "jotai";
import type { TerminalTab } from "@/features/terminal/types/terminal";
import {
  persistedActiveTabIdAtom,
  persistedTabsAtom,
} from "@/features/tabs/atoms/tabs-storage-atoms";

/** Live ConPTY session IDs — not persisted across app restarts. */
const sessionIdsAtom = atom<Record<string, string>>({});

export const tabsAtom = atom(
  (get) => {
    const persisted = get(persistedTabsAtom);
    const sessionIds = get(sessionIdsAtom);
    return persisted.map((tab) => ({
      ...tab,
      sessionId: sessionIds[tab.id] ?? "",
    }));
  },
  (_get, set, tabs: TerminalTab[]) => {
    set(
      persistedTabsAtom,
      tabs.map(({ id, title, shellId }) => ({ id, title, shellId })),
    );
    set(
      sessionIdsAtom,
      Object.fromEntries(
        tabs
          .filter((tab) => tab.sessionId)
          .map((tab) => [tab.id, tab.sessionId]),
      ),
    );
  },
);

export const activeTabIdAtom = atom(
  (get) => get(persistedActiveTabIdAtom),
  (_get, set, tabId: string | null) => {
    set(persistedActiveTabIdAtom, tabId);
  },
);

export const addTabAtom = atom(null, (get, set, tab: TerminalTab) => {
  set(tabsAtom, [...get(tabsAtom), tab]);
  set(activeTabIdAtom, tab.id);
});

export const removeTabAtom = atom(null, (get, set, tabId: string) => {
  const tabs = get(tabsAtom);
  const index = tabs.findIndex((tab) => tab.id === tabId);
  const nextTabs = tabs.filter((tab) => tab.id !== tabId);
  let activeTabId = get(activeTabIdAtom);

  if (activeTabId === tabId) {
    const nextTab = nextTabs[index] ?? nextTabs[index - 1] ?? null;
    activeTabId = nextTab?.id ?? null;
  }

  set(tabsAtom, nextTabs);
  set(activeTabIdAtom, activeTabId);
});

export const setActiveTabAtom = atom(null, (_get, set, tabId: string) => {
  set(activeTabIdAtom, tabId);
});

export const updateTabTitleAtom = atom(
  null,
  (get, set, tabId: string, title: string) => {
    set(
      tabsAtom,
      get(tabsAtom).map((tab) => (tab.id === tabId ? { ...tab, title } : tab)),
    );
  },
);

export const updateTabSessionIdAtom = atom(
  null,
  (get, set, tabId: string, sessionId: string) => {
    set(sessionIdsAtom, { ...get(sessionIdsAtom), [tabId]: sessionId });
  },
);

export const nextTabAtom = atom(null, (get, set) => {
  const tabs = get(tabsAtom);
  if (tabs.length === 0) {
    return;
  }

  const activeTabId = get(activeTabIdAtom);
  const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabs.length;
  set(activeTabIdAtom, tabs[nextIndex].id);
});
