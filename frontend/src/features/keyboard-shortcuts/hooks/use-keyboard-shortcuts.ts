import { useEffect } from "react";

export interface KeyboardShortcutHandlers {
  onNewTab: () => void;
  onCloseTab: () => void;
  onNextTab: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const withShift = event.shiftKey;
      const withCtrl = event.ctrlKey || event.metaKey;

      if (withCtrl && withShift && key === "t") {
        event.preventDefault();
        handlers.onNewTab();
        return;
      }

      if (withCtrl && withShift && key === "w") {
        event.preventDefault();
        handlers.onCloseTab();
        return;
      }

      if (withCtrl && !withShift && key === "tab") {
        event.preventDefault();
        handlers.onNextTab();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
}
