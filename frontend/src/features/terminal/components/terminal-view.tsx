import { useTranslation } from "react-i18next";
import { useTerminalSession } from "@/features/terminal/hooks/use-terminal-session";
import type { AppSettings } from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

interface TerminalViewProps {
  tabId: string;
  shellId: ShellId;
  active: boolean;
  settings: AppSettings | null;
  onSessionReady?: (sessionId: string) => void;
  onSessionExit?: (exitCode: number) => void;
}

export function TerminalView({
  tabId,
  shellId,
  active,
  settings,
  onSessionReady,
  onSessionExit,
}: TerminalViewProps) {
  const { t } = useTranslation();
  const { containerRef, error } = useTerminalSession({
    tabId,
    shellId,
    active,
    settings,
    onSessionReady,
    onSessionExit,
  });

  const errorMessage =
    error?.kind === "startSessionFailed"
      ? t("terminal.errors.startSessionFailed")
      : error?.kind === "message"
        ? error.message
        : null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-terminal-background">
      <div ref={containerRef} className="h-full w-full p-1" />
      {errorMessage ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}
