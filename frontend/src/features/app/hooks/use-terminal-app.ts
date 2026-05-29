import { useCallback, useEffect, useState } from "react";
import { listShells, type ShellProfile } from "@/shared/services/terminal-bridge";
import type { ShellId, TerminalTab } from "@/features/terminal/types/terminal";
import { useAppSettings } from "@/features/settings/hooks/use-app-settings";
import { useSettingsUi } from "@/features/settings/hooks/use-settings-ui";
import { useCommandPaletteState } from "@/features/command-palette/hooks/use-command-palette-state";
import { useProfilesSheet } from "@/features/top-navigation/hooks/use-profiles-sheet";
import { useTabsStore } from "@/features/tabs/hooks/use-tabs-store";
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
  const { tabs, activeTabId, addTab, setActiveTab, nextTab } = useTabsStore();
  const { defaultShell, settings, loading, persistSettings } = useAppSettings();
  const { profilesOpen, setProfilesOpen } = useProfilesSheet();
  const { settingsOpen, setSettingsOpen } = useSettingsUi();
  const { commandPaletteOpen, setCommandPaletteOpen } = useCommandPaletteState();
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
    if (tabs.length === 0) {
      if (!loading) {
        openNewTab(defaultShell);
      }
      return;
    }

    const activeIsValid =
      activeTabId != null && tabs.some((tab) => tab.id === activeTabId);
    if (!activeIsValid) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTabId, loading, defaultShell, openNewTab, setActiveTab]);

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
