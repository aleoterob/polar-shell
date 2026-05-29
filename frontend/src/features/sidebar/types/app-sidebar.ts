import type { ShellProfile } from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

export interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shells: ShellProfile[];
  onNewTab: (shellId: ShellId) => void;
}
