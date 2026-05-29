import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { removeTabAtom } from "@/features/tabs/atoms/atoms";

/** Removes a tab; ConPTY is closed when the tab's session hook unmounts. */
export function useCloseTerminalTab() {
  const removeTab = useSetAtom(removeTabAtom);

  return useCallback(
    (tabId: string) => {
      removeTab(tabId);
    },
    [removeTab],
  );
}
