import { useEffect, useState } from "react";
import { loadSettings, type AppSettings } from "@/shared/services/terminal-bridge";
import type { ShellId } from "@/features/terminal/types/terminal";

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const defaultShell = (settings?.defaultShell as ShellId | undefined) ?? "powershell";

  useEffect(() => {
    let cancelled = false;

    loadSettings()
      .then((loaded) => {
        if (!cancelled) {
          setSettings(loaded);
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
  }, []);

  return {
    settings,
    loading,
    defaultShell,
  };
}
