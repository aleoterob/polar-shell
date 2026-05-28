import { useTerminalSession } from "@/hooks/useTerminalSession";
import type { AppSettings } from "@/services/terminalBridge";
import type { ShellId } from "@/types/terminal";

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
  const { containerRef, error } = useTerminalSession({
    tabId,
    shellId,
    active,
    settings,
    onSessionReady,
    onSessionExit,
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c0c0c]">
      <div ref={containerRef} className="h-full w-full p-1" />
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
          {error}
        </div>
      ) : null}
    </div>
  );
}
