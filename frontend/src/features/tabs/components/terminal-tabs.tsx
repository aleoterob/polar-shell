import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { cn } from '@/shared/lib/utils';
import { useTerminalTabClose } from '@/features/tabs/hooks/use-terminal-tab-close';
import type { TerminalTabsProps } from '@/features/tabs/types/terminal-tabs';

export function TerminalTabs({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
}: TerminalTabsProps) {
  const { createCloseClickHandler, createCloseKeyHandler } =
    useTerminalTabClose(onCloseTab);

  return (
    <Tabs
      value={activeTabId}
      onValueChange={(value) => {
        if (typeof value === 'string') {
          onSelectTab(value);
        }
      }}
      className="gap-0"
    >
      <div
        className={cn(
          "flex min-w-0 shrink-0 items-end bg-background pl-0 pr-2",
        )}
      >
        <div className="flex min-w-0 flex-1 items-end overflow-x-auto pl-0 pr-0.5 pt-0.5 pb-px">
          <div className="inline-flex w-max items-end gap-0.5">
            <TabsList variant="chrome">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="group/tab data-active:bg-terminal-tab-active-background"
                >
                  <span className="min-w-0 flex-1 truncate text-left">
                    {tab.title}
                  </span>
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`Close ${tab.title}`}
                    className={cn(
                      'inline-flex shrink-0 rounded p-0.5 opacity-0 transition-opacity',
                      'hover:bg-muted group-hover/tab:opacity-100 group-data-active/tab:opacity-100',
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={createCloseClickHandler(tab.id)}
                    onKeyDown={createCloseKeyHandler(tab.id)}
                  >
                    <X className="size-3" />
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              variant="ghost"
              size="icon-xs"
              className="size-6 shrink-0"
              aria-label="New terminal tab"
              onClick={onNewTab}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
