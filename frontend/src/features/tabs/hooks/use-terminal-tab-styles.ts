import { cn } from "@/shared/lib/utils";

/** Chrome classes for editor-style tabs (shadcn Tabs + local overrides). */
export function useTerminalTabStyles() {
  const barClassName =
    "flex h-10 min-w-0 shrink-0 items-end gap-1 overflow-x-auto overflow-y-hidden border-b border-terminal-tab-border bg-[#1e1e1e] px-2 pt-1";

  const listClassName =
    "h-auto gap-0.5 rounded-none border-0 bg-transparent p-0 shadow-none";

  const triggerClassName = cn(
    "group/tab h-8 min-w-[120px] max-w-[220px] flex-none gap-1.5 rounded-t-md rounded-b-none px-2.5 text-xs",
    "border border-terminal-tab-border border-b-0",
    "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
    "data-active:z-[1] data-active:bg-[#0c0c0c] data-active:text-foreground",
    "data-active:border-terminal-tab-border data-active:border-b-[#0c0c0c]",
    "data-active:shadow-none dark:data-active:!border-terminal-tab-border dark:data-active:bg-[#0c0c0c]",
  );

  const closeButtonClassName = cn(
    "inline-flex shrink-0 rounded p-0.5 opacity-0 transition-opacity",
    "hover:bg-muted group-hover/tab:opacity-100 group-data-active/tab:opacity-100",
  );

  return {
    barClassName,
    listClassName,
    triggerClassName,
    closeButtonClassName,
  };
}
