import { useCallback, useEffect, useState } from "react";
import { listShells, type ShellProfile } from "@/services/terminalBridge";
import { useTerminalStore } from "@/stores/terminalStore";
import type { ShellId, TerminalTab } from "@/types/terminal";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useCloseTerminalTab } from "@/hooks/useCloseTerminalTab";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

function createTabId() {
  return crypto.randomUUID();
}

function shellTitle(shellId: ShellId, shells: ShellProfile[]) {
  const profile = shells.find((shell) => shell.id === shellId);
  return profile?.name ?? shellId;
}

export function useTerminalApp() {
  const {
    tabs,
    activeTabId,
    defaultShell,
    sidebarOpen,
    settingsOpen,
    commandPaletteOpen,
    setSidebarOpen,
    setSettingsOpen,
    setCommandPaletteOpen,
    addTab,
    setActiveTab,
    nextTab,
  } = useTerminalStore();

  const { settings, loading, persistSettings } = useAppSettings();
  const closeTab = useCloseTerminalTab();
  const [shells, setShells] = useState<ShellProfile[]>([]);

  useEffect(() => {
    void listShells().then(setShells);
  }, []);

  const openNewTab = useCallback(
    (shellId: ShellId = defaultShell) => {
      const tab: TerminalTab = {
        id: createTabId(),
        sessionId: "",
        title: shellTitle(shellId, shells),
        shellId,
      };
      addTab(tab);
    },
    [addTab, defaultShell, shells],
  );

  useEffect(() => {
    if (tabs.length === 0 && !loading) {
      openNewTab(defaultShell);
    }
  }, [tabs.length, loading, defaultShell, openNewTab]);

  useKeyboardShortcuts({
    onNewTab: () => openNewTab(),
    onCloseTab: () => {
      if (!activeTabId) {
        return;
      }
      closeTab(activeTabId);
    },
    onNextTab: nextTab,
    onOpenCommandPalette: () => setCommandPaletteOpen(true),
    onOpenSettings: () => setSettingsOpen(true),
  });

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? null;

  return {
    tabs,
    activeTab,
    activeTabId,
    shells,
    settings,
    settingsLoading: loading,
    sidebarOpen,
    settingsOpen,
    commandPaletteOpen,
    setSidebarOpen,
    setSettingsOpen,
    setCommandPaletteOpen,
    openNewTab,
    setActiveTab,
    persistSettings,
  };
}
