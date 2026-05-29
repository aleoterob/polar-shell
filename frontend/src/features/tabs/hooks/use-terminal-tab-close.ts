import { useCallback, type KeyboardEvent, type MouseEvent } from "react";

export function useTerminalTabClose(onCloseTab: (tabId: string) => void) {
  const closeTab = useCallback(
    (tabId: string) => {
      onCloseTab(tabId);
    },
    [onCloseTab],
  );

  const createCloseClickHandler = useCallback(
    (tabId: string) => (event: MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
      closeTab(tabId);
    },
    [closeTab],
  );

  const createCloseKeyHandler = useCallback(
    (tabId: string) => (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      closeTab(tabId);
    },
    [closeTab],
  );

  return { createCloseClickHandler, createCloseKeyHandler };
}
