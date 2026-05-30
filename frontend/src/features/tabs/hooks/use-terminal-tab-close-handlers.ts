import type { KeyboardEvent, MouseEvent } from "react";

export function useTerminalTabCloseHandlers(onCloseTab: (tabId: string) => void) {
  const createCloseClickHandler =
    (tabId: string) => (event: MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onCloseTab(tabId);
    };

  const createCloseKeyHandler =
    (tabId: string) => (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      onCloseTab(tabId);
    };

  return { createCloseClickHandler, createCloseKeyHandler };
}
