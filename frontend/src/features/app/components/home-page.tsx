import { useTranslation } from 'react-i18next';
import { TerminalTabs } from '@/features/tabs/components/terminal-tabs';
import { TerminalView } from '@/features/terminal/components/terminal-view';
import { useCloseTerminalTab } from '@/features/tabs/hooks/use-close-terminal-tab';
import { useTabExitedTitle } from '@/features/app/hooks/use-tab-exited-title';
import { useTerminalApp } from '@/features/app/hooks/use-terminal-app';
import { useTabsStore } from '@/features/tabs/hooks/use-tabs-store';
import { cn } from '@/shared/lib/utils';

export function HomePage() {
  const { t } = useTranslation();
  const { tabs, activeTabId, settings, openNewTab, setActiveTab } =
    useTerminalApp();

  const closeTab = useCloseTerminalTab();
  const { updateTabTitle, updateTabSessionId } = useTabsStore();
  const formatTabExitedTitle = useTabExitedTitle();

  return (
    <>
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
              'absolute inset-0',
              tab.id === activeTabId
                ? 'z-10 visible'
                : 'pointer-events-none invisible z-0',
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
                updateTabTitle(tab.id, formatTabExitedTitle(tab.title));
              }}
            />
          </div>
        ))}

        {tabs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {t('app.emptyTabsHint')}
          </div>
        ) : null}
      </div>
    </>
  );
}
