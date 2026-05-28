import { Events } from "@wailsio/runtime";
import * as TerminalService from "../../bindings/github.com/polarshell/polarshell/terminalservice.js";
import {
  AppSettings,
  SessionInfo,
  ShellProfile,
} from "../../bindings/github.com/polarshell/polarshell/backend/models/models.js";
import type {
  TerminalExitEvent,
  TerminalOutputEvent,
} from "@/types/terminal";

export type { AppSettings, SessionInfo, ShellProfile };

export const TERMINAL_OUTPUT_EVENT = "terminal:output";
export const TERMINAL_EXIT_EVENT = "terminal:exit";

export function createSession(
  shellId: string,
  cols: number,
  rows: number,
): Promise<SessionInfo> {
  return TerminalService.CreateSession(shellId, cols, rows);
}

export function writeSession(sessionId: string, data: string): Promise<void> {
  return TerminalService.Write(sessionId, data);
}

export function resizeSession(
  sessionId: string,
  cols: number,
  rows: number,
): Promise<void> {
  return TerminalService.Resize(sessionId, cols, rows);
}

export function closeSession(sessionId: string): Promise<void> {
  return TerminalService.CloseSession(sessionId);
}

export function listShells(): Promise<ShellProfile[]> {
  return TerminalService.ListShells();
}

export function loadSettings(): Promise<AppSettings> {
  return TerminalService.LoadSettings();
}

export function saveSettings(settings: AppSettings): Promise<void> {
  return TerminalService.SaveSettings(settings);
}

export function onTerminalOutput(
  handler: (event: TerminalOutputEvent) => void,
): () => void {
  return Events.On(TERMINAL_OUTPUT_EVENT, (event) => {
    const payload = event.data as TerminalOutputEvent;
    if (!payload?.sessionId) {
      return;
    }
    handler(payload);
  });
}

export function onTerminalExit(
  handler: (event: TerminalExitEvent) => void,
): () => void {
  return Events.On(TERMINAL_EXIT_EVENT, (event) => {
    const payload = event.data as TerminalExitEvent;
    if (!payload?.sessionId) {
      return;
    }
    handler(payload);
  });
}
