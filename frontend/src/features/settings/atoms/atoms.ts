import { atom } from "jotai";
import type { ShellId } from "@/features/terminal/types/terminal";

export const defaultShellAtom = atom<ShellId>("powershell");
export const settingsOpenAtom = atom(false);
