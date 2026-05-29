import { PanelLeft, Search, Settings } from "lucide-react";
import { AppLogo } from "@/features/app/components/app-logo";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { TerminalTabs } from "@/features/tabs/components/terminal-tabs";
import { TerminalView } from "@/features/terminal/components/terminal-view";
import { AppSidebar } from "@/features/sidebar/components/app-sidebar";
import { SettingsDialog } from "@/features/settings/components/settings-dialog";
import { CommandPalette } from "@/features/command-palette/components/command-palette";
import { useCloseTerminalTab } from "@/features/tabs/hooks/use-close-terminal-tab";
import { useTerminalApp } from "@/features/app/hooks/use-terminal-app";
import { useTerminalStore } from "@/features/terminal/stores/terminal-store";
import { cn } from "@/shared/lib/utils";

export function AppShell() {
  const {
    tabs,
    activeTabId,
    shells,
    settings,
    sidebarOpen,
    settingsOpen,
    commandPaletteOpen,
    setSidebarOpen,
    setSettingsOpen,
    setCommandPaletteOpen,
    openNewTab,
    setActiveTab,
    persistSettings,
  } = useTerminalApp();

  const closeTab = useCloseTerminalTab();
  const updateTabTitle = useTerminalStore((state) => state.updateTabTitle);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen flex-col bg-background">
        <header className="flex h-10 items-center justify-between border-b border-border bg-[#1e1e1e] px-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <AppLogo />
            PolarShell
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Toggle sidebar"
                  onClick={() => setSidebarOpen(true)}
                >
                  <PanelLeft className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Profiles</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Command palette"
                  onClick={() => setCommandPaletteOpen(true)}
                >
                  <Search className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Command palette (Ctrl+Shift+P)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Settings"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings (Ctrl+,)</TooltipContent>
            </Tooltip>
          </div>
        </header>

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
                  useTerminalStore.setState((state) => ({
                    tabs: state.tabs.map((item) =>
                      item.id === tab.id ? { ...item, sessionId } : item,
                    ),
                  }));
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

        <AppSidebar
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          shells={shells}
          onNewTab={openNewTab}
        />

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
