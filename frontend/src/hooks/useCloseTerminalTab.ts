import { useCallback } from "react";
import { useTerminalStore } from "@/stores/terminalStore";

/** Removes a tab; ConPTY is closed when the tab's session hook unmounts. */
export function useCloseTerminalTab() {
  const removeTab = useTerminalStore((state) => state.removeTab);

  return useCallback(
    (tabId: string) => {
      removeTab(tabId);
    },
    [removeTab],
  );
}
