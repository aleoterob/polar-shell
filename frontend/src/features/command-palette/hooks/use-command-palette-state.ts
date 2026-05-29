import { useAtomValue, useSetAtom } from "jotai";
import { commandPaletteOpenAtom } from "@/features/command-palette/atoms/atoms";

export function useCommandPaletteState() {
  const commandPaletteOpen = useAtomValue(commandPaletteOpenAtom);
  const setCommandPaletteOpen = useSetAtom(commandPaletteOpenAtom);

  return { commandPaletteOpen, setCommandPaletteOpen };
}
