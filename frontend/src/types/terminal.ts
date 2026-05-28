export type ShellId = "powershell" | "cmd" | "wsl" | "git-bash" | string;

export interface TerminalTab {
  id: string;
  sessionId: string;
  title: string;
  shellId: ShellId;
}

export interface TerminalOutputEvent {
  sessionId: string;
  data: string;
}

export interface TerminalExitEvent {
  sessionId: string;
  exitCode: number;
}
