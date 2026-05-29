import type { ShellProfile } from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

export interface TopNavigationProps {
  shells: ShellProfile[];
  profilesOpen: boolean;
  onProfilesOpenChange: (open: boolean) => void;
  onOpenCommandPalette: () => void;
  onOpenSettings: () => void;
  onNewTab: (shellId: ShellId) => void;
}
