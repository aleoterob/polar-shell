import { useAtomValue, useSetAtom } from "jotai";
import { settingsOpenAtom } from "@/features/settings/atoms/atoms";

export function useSettingsUi() {
  const settingsOpen = useAtomValue(settingsOpenAtom);
  const setSettingsOpen = useSetAtom(settingsOpenAtom);

  return { settingsOpen, setSettingsOpen };
}
