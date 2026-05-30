import { useEffect, useState } from "react";
import { listShells, type ShellProfile } from "@/shared/services/terminal-bridge";
import type { ShellId, TerminalTab } from "@/features/terminal/types/terminal";
import { useAppSettings } from "@/features/app/hooks/use-app-settings";
import { useTabsStore } from "@/features/tabs/hooks/use-tabs-store";
import { useRemoveTerminalTab } from "@/features/tabs/hooks/use-remove-terminal-tab";
import { useKeyboardShortcuts } from "@/features/keyboard-shortcuts/hooks/use-keyboard-shortcuts";

function createTabId() {
  return crypto.randomUUID();
}

function shellTitle(shellId: ShellId, shells: ShellProfile[]) {
  const profile = shells.find((shell) => shell.id === shellId);
  return profile?.name ?? shellId;
}

export function useTerminalApp() {
  const { tabs, activeTabId, addTab, setActiveTab, nextTab } = useTabsStore();
  const { defaultShell, settings, loading } = useAppSettings();
  const closeTab = useRemoveTerminalTab();
  const [shells, setShells] = useState<ShellProfile[]>([]);

  useEffect(() => {
    void listShells().then(setShells);
  }, []);

  const openNewTab = (shellId: ShellId = defaultShell) => {
    const tab: TerminalTab = {
      id: createTabId(),
      sessionId: "",
      title: shellTitle(shellId, shells),
      shellId,
    };
    addTab(tab);
  };

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
  });

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? null;

  return {
    tabs,
    activeTab,
    activeTabId,
    shells,
    settings,
    settingsLoading: loading,
    openNewTab,
    setActiveTab,
  };
}
