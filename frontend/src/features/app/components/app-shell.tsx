import { TerminalTabs } from "@/features/tabs/components/terminal-tabs";
import { TerminalView } from "@/features/terminal/components/terminal-view";
import { useCloseTerminalTab } from "@/features/tabs/hooks/use-close-terminal-tab";
import { useTerminalApp } from "@/features/app/hooks/use-terminal-app";
import { useTabsStore } from "@/features/tabs/hooks/use-tabs-store";
import {
  MainSidebar,
  mainSidebarProviderStyle,
} from "@/features/main-sidebar/components/main-sidebar";
import { cn } from "@/shared/lib/utils";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export function AppShell() {
  const { tabs, activeTabId, settings, openNewTab, setActiveTab } =
    useTerminalApp();

  const closeTab = useCloseTerminalTab();
  const { updateTabTitle, updateTabSessionId } = useTabsStore();

  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen
        className="flex h-svh min-h-0 w-full bg-background"
        style={mainSidebarProviderStyle}
      >
        <MainSidebar />
        <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <TerminalTabs
            tabs={tabs}
            activeTabId={activeTabId}
            onSelectTab={setActiveTab}
            onCloseTab={closeTab}
            onNewTab={() => openNewTab()}
          />

          <div className="relative min-h-0 flex-1">
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
