import { create } from "zustand";
import type { ShellId, TerminalTab } from "@/types/terminal";

interface TerminalStoreState {
  tabs: TerminalTab[];
  activeTabId: string | null;
  defaultShell: ShellId;
  sidebarOpen: boolean;
  settingsOpen: boolean;
  commandPaletteOpen: boolean;
  setDefaultShell: (shellId: ShellId) => void;
  setSidebarOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  addTab: (tab: TerminalTab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabTitle: (tabId: string, title: string) => void;
  nextTab: () => void;
}

export const useTerminalStore = create<TerminalStoreState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  defaultShell: "powershell",
  sidebarOpen: false,
  settingsOpen: false,
  commandPaletteOpen: false,
  setDefaultShell: (shellId) => set({ defaultShell: shellId }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  addTab: (tab) =>
    set((state) => ({
      tabs: [...state.tabs, tab],
      activeTabId: tab.id,
    })),
  removeTab: (tabId) =>
    set((state) => {
      const index = state.tabs.findIndex((tab) => tab.id === tabId);
      const tabs = state.tabs.filter((tab) => tab.id !== tabId);
      let activeTabId = state.activeTabId;

      if (activeTabId === tabId) {
        const nextTab = tabs[index] ?? tabs[index - 1] ?? null;
        activeTabId = nextTab?.id ?? null;
      }

      return { tabs, activeTabId };
    }),
  setActiveTab: (tabId) => set({ activeTabId: tabId }),
  updateTabTitle: (tabId, title) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, title } : tab,
      ),
    })),
  nextTab: () => {
    const { tabs, activeTabId } = get();
    if (tabs.length === 0) {
      return;
    }

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabs.length;
    set({ activeTabId: tabs[nextIndex].id });
  },
}));
