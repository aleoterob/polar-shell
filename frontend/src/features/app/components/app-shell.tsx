import { TerminalTabs } from "@/features/tabs/components/terminal-tabs";
import { TerminalView } from "@/features/terminal/components/terminal-view";
import { TopNavigation } from "@/features/top-navigation/components/top-navigation";
import { SettingsDialog } from "@/features/settings/components/settings-dialog";
import { CommandPalette } from "@/features/command-palette/components/command-palette";
import { useCloseTerminalTab } from "@/features/tabs/hooks/use-close-terminal-tab";
import { useTerminalApp } from "@/features/app/hooks/use-terminal-app";
import { useTabsStore } from "@/features/tabs/hooks/use-tabs-store";
import { cn } from "@/shared/lib/utils";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export function AppShell() {
  const {
    tabs,
    activeTabId,
    shells,
    settings,
    profilesOpen,
    settingsOpen,
    commandPaletteOpen,
    setProfilesOpen,
    setSettingsOpen,
    setCommandPaletteOpen,
    openNewTab,
    setActiveTab,
    persistSettings,
  } = useTerminalApp();

  const closeTab = useCloseTerminalTab();
  const { updateTabTitle, updateTabSessionId } = useTabsStore();

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen flex-col bg-background">
        <TopNavigation
          shells={shells}
          profilesOpen={profilesOpen}
          onProfilesOpenChange={setProfilesOpen}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onNewTab={openNewTab}
        />

        <TerminalTabs
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTab}
          onCloseTab={closeTab}
          onNewTab={() => openNewTab()}
        />

        <main className="relative min-h-0 flex-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "absolute inset-0",
                tab.id === activeTabId
                  ? "z-10 visible"
                  : "pointer-events-none invisible z-0",
              )}
            >
              <TerminalView
                key={tab.id}
                tabId={tab.id}
                shellId={tab.shellId}
                active={tab.id === activeTabId}
                settings={settings}
                onSessionReady={(sessionId) => {
                  updateTabSessionId(tab.id, sessionId);
                }}
                onSessionExit={() => {
                  updateTabTitle(tab.id, `${tab.title} (exited)`);
                }}
              />
            </div>
          ))}

          {tabs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Press + or Ctrl+Shift+T to open a terminal
            </div>
          ) : null}
        </main>

        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          shells={shells}
          onSave={persistSettings}
        />

        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          shells={shells}
          onNewTab={openNewTab}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      </div>
    </TooltipProvider>
  );
}
