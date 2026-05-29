import { Plus, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useTerminalTabClose } from "@/features/tabs/hooks/use-terminal-tab-close";
import { useTerminalTabStyles } from "@/features/tabs/hooks/use-terminal-tab-styles";
import type { TerminalTabsProps } from "@/features/tabs/types/terminal-tabs";

export function TerminalTabs({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
}: TerminalTabsProps) {
  const { createCloseClickHandler, createCloseKeyHandler } =
    useTerminalTabClose(onCloseTab);
  const { barClassName, listClassName, triggerClassName, closeButtonClassName } =
    useTerminalTabStyles();

  return (
    <Tabs
      value={activeTabId}
      onValueChange={(value) => {
        if (typeof value === "string") {
          onSelectTab(value);
        }
      }}
      className="gap-0"
    >
      <div className={barClassName}>
        <TabsList variant="default" className={listClassName}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={triggerClassName}
            >
              <span className="min-w-0 flex-1 truncate text-left">
                {tab.title}
              </span>
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Close ${tab.title}`}
                className={closeButtonClassName}
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
          className="mb-0.5 shrink-0"
          aria-label="New terminal tab"
          onClick={onNewTab}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </Tabs>
  );
}
