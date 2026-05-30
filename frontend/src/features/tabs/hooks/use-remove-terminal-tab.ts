import { useSetAtom } from "jotai";
import { removeTabAtom } from "@/features/tabs/atoms/tabs-atoms";

/** Removes a tab; ConPTY is closed when the tab's session hook unmounts. */
export function useRemoveTerminalTab() {
  const removeTab = useSetAtom(removeTabAtom);

  return (tabId: string) => {
    removeTab(tabId);
  };
}
