import type { AppSettings, ShellProfile } from "@/shared/services/terminal-bridge";

export interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: AppSettings | null;
  shells: ShellProfile[];
  onSave: (settings: AppSettings) => Promise<void>;
}
