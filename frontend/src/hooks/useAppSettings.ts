import { useEffect, useState } from "react";
import {
  loadSettings,
  saveSettings,
  type AppSettings,
} from "@/services/terminalBridge";
import { useTerminalStore } from "@/stores/terminalStore";
import type { ShellId } from "@/types/terminal";

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const setDefaultShell = useTerminalStore((state) => state.setDefaultShell);

  useEffect(() => {
    let cancelled = false;

    loadSettings()
      .then((loaded) => {
        if (cancelled) {
          return;
        }
        setSettings(loaded);
        if (loaded.defaultShell) {
          setDefaultShell(loaded.defaultShell as ShellId);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setDefaultShell]);

  const persistSettings = async (next: AppSettings) => {
    setSettings(next);
    if (next.defaultShell) {
      setDefaultShell(next.defaultShell as ShellId);
    }
    await saveSettings(next);
  };

  return {
    settings,
    loading,
    persistSettings,
  };
}
