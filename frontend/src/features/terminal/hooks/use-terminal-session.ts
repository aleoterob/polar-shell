import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { SearchAddon } from "@xterm/addon-search";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";
import {
  closeSession,
  createSession,
  onTerminalExit,
  onTerminalOutput,
  resizeSession,
  writeSession,
  type AppSettings,
} from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

interface UseTerminalSessionOptions {
  tabId: string;
  shellId: ShellId;
  active: boolean;
  settings: AppSettings | null;
  onSessionReady?: (sessionId: string) => void;
  onSessionExit?: (exitCode: number) => void;
}

const defaultTheme = {
  background: "#0c0c0c",
  foreground: "#cccccc",
  cursor: "#ffffff",
  cursorAccent: "#0c0c0c",
  selectionBackground: "#264f78",
  black: "#0c0c0c",
  red: "#f14c4c",
  green: "#23d18b",
  yellow: "#f5f543",
  blue: "#3b82f6",
  magenta: "#bc3fbc",
  cyan: "#29b8db",
  white: "#cccccc",
  brightBlack: "#666666",
  brightRed: "#f14c4c",
  brightGreen: "#23d18b",
  brightYellow: "#f5f543",
  brightBlue: "#3b82f6",
  brightMagenta: "#d670d6",
  brightCyan: "#29b8db",
  brightWhite: "#ffffff",
};

function applyTerminalSettings(terminal: Terminal, settings: AppSettings | null) {
  if (!settings) {
    return;
  }

  terminal.options.fontFamily =
    settings.fontFamily || "Cascadia Mono, Consolas, monospace";
  terminal.options.fontSize = settings.fontSize || 14;
  terminal.options.scrollback = settings.scrollback || 10000;
}

export function useTerminalSession({
  tabId,
  shellId,
  active,
  settings,
  onSessionReady,
  onSessionExit,
}: UseTerminalSessionOptions) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const searchAddonRef = useRef<SearchAddon | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const unsubscribeOutputRef = useRef<(() => void) | null>(null);
  const unsubscribeExitRef = useRef<(() => void) | null>(null);
  const activeRef = useRef(active);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  activeRef.current = active;

  const onSessionReadyRef = useRef(onSessionReady);
  const onSessionExitRef = useRef(onSessionExit);
  onSessionReadyRef.current = onSessionReady;
  onSessionExitRef.current = onSessionExit;

  const detachListeners = () => {
    unsubscribeOutputRef.current?.();
    unsubscribeExitRef.current?.();
    unsubscribeOutputRef.current = null;
    unsubscribeExitRef.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const terminal = new Terminal({
      cursorBlink: true,
      scrollback: 10000,
      fontFamily: "Cascadia Mono, Consolas, monospace",
      fontSize: 14,
      theme: defaultTheme,
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    const searchAddon = new SearchAddon();
    const webLinksAddon = new WebLinksAddon();

    terminal.loadAddon(fitAddon);
    terminal.loadAddon(searchAddon);
    terminal.loadAddon(webLinksAddon);
    terminal.open(container);
    applyTerminalSettings(terminal, settings);

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;
    searchAddonRef.current = searchAddon;

    terminal.onData((data) => {
      const sessionId = sessionIdRef.current;
      if (!sessionId) {
        return;
      }
      void writeSession(sessionId, data);
    });

    const fitAndResize = () => {
      const currentTerminal = terminalRef.current;
      const currentFitAddon = fitAddonRef.current;
      const sessionId = sessionIdRef.current;
      if (!currentTerminal || !currentFitAddon || !sessionId || !activeRef.current) {
        return;
      }

      currentFitAddon.fit();
      if (currentTerminal.cols > 0 && currentTerminal.rows > 0) {
        void resizeSession(
          sessionId,
          currentTerminal.cols,
          currentTerminal.rows,
        );
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      fitAndResize();
    });
    resizeObserver.observe(container);

    const handleWindowResize = () => {
      fitAndResize();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      detachListeners();
      terminal.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
      searchAddonRef.current = null;
    };
  }, [shellId, tabId]);

  useEffect(() => {
    return () => {
      const sessionId = sessionIdRef.current;
      sessionIdRef.current = null;
      setReady(false);
      detachListeners();
      if (sessionId) {
        void closeSession(sessionId);
      }
    };
  }, [tabId]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    applyTerminalSettings(terminal, settings);
  }, [settings]);

  useEffect(() => {
    if (!active || sessionIdRef.current || !terminalRef.current) {
      return;
    }

    let disposed = false;

    const startSession = async () => {
      const terminal = terminalRef.current;
      const fitAddon = fitAddonRef.current;
      if (!terminal || !fitAddon) {
        return;
      }

      fitAddon.fit();
      const cols = Math.max(terminal.cols, 80);
      const rows = Math.max(terminal.rows, 24);

      try {
        const session = await createSession(shellId, cols, rows);
        if (disposed) {
          await closeSession(session.id);
          return;
        }

        sessionIdRef.current = session.id;
        setReady(true);
        setError(null);
        onSessionReadyRef.current?.(session.id);

        unsubscribeOutputRef.current = onTerminalOutput(
          ({ sessionId, data }) => {
            if (sessionId !== sessionIdRef.current || !data) {
              return;
            }
            terminal.write(data);
          },
        );

        unsubscribeExitRef.current = onTerminalExit(
          ({ sessionId, exitCode }) => {
            if (sessionId !== sessionIdRef.current) {
              return;
            }
            onSessionExitRef.current?.(exitCode);
          },
        );
      } catch (startError) {
        if (disposed) {
          return;
        }
        const message =
          startError instanceof Error
            ? startError.message
            : t('terminal.errors.startSessionFailed');
        setError(message);
      }
    };

    void startSession();

    return () => {
      disposed = true;
    };
  }, [active, shellId, t]);

  useEffect(() => {
    if (!active || !ready) {
      return;
    }

    const fitAddon = fitAddonRef.current;
    const terminal = terminalRef.current;
    const sessionId = sessionIdRef.current;
    if (!fitAddon || !terminal || !sessionId) {
      return;
    }

    fitAddon.fit();
    void resizeSession(sessionId, terminal.cols, terminal.rows);
  }, [active, ready]);

  const findNext = (term: string) => {
    searchAddonRef.current?.findNext(term);
  };

  const findPrevious = (term: string) => {
    searchAddonRef.current?.findPrevious(term);
  };

  return {
    containerRef,
    ready,
    error,
    findNext,
    findPrevious,
  };
}
