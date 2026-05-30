import { useAtomValue, useSetAtom } from "jotai";
import {
  activeTabIdAtom,
  addTabAtom,
  nextTabAtom,
  removeTabAtom,
  setActiveTabAtom,
  tabsAtom,
  updateTabSessionIdAtom,
  updateTabTitleAtom,
} from "@/features/tabs/atoms/tabs-atoms";

export function useTabsStore() {
  const tabs = useAtomValue(tabsAtom);
  const activeTabId = useAtomValue(activeTabIdAtom);
  const addTab = useSetAtom(addTabAtom);
  const removeTab = useSetAtom(removeTabAtom);
  const setActiveTab = useSetAtom(setActiveTabAtom);
  const updateTabTitle = useSetAtom(updateTabTitleAtom);
  const updateTabSessionId = useSetAtom(updateTabSessionIdAtom);
  const nextTab = useSetAtom(nextTabAtom);

  return {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    setActiveTab,
    updateTabTitle,
    updateTabSessionId,
    nextTab,
  };
}
