import type { ShellProfile } from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shells: ShellProfile[];
  onNewTab: (shellId: ShellId) => void;
  onOpenSettings: () => void;
  onSearchTerminal?: (query: string) => void;
}
