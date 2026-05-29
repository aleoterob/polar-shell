import { useCallback, useEffect, useState } from "react";
import { listShells, type ShellProfile } from "@/shared/services/terminal-bridge";
import { useTerminalStore } from "@/features/terminal/stores/terminal-store";
import type { ShellId, TerminalTab } from "@/features/terminal/types/terminal";
import { useAppSettings } from "@/features/settings/hooks/use-app-settings";
import { useCloseTerminalTab } from "@/features/tabs/hooks/use-close-terminal-tab";
import { useKeyboardShortcuts } from "@/shared/hooks/use-keyboard-shortcuts";

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
    profilesOpen,
    settingsOpen,
    commandPaletteOpen,
    setProfilesOpen,
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
    profilesOpen,
    settingsOpen,
    commandPaletteOpen,
    setProfilesOpen,
    setSettingsOpen,
    setCommandPaletteOpen,
    openNewTab,
    setActiveTab,
    persistSettings,
  };
}
