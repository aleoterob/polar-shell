import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AppSettings, ShellProfile } from "@/services/terminalBridge";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: AppSettings | null;
  shells: ShellProfile[];
  onSave: (settings: AppSettings) => Promise<void>;
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  shells,
  onSave,
}: SettingsDialogProps) {
  const [draft, setDraft] = useState<AppSettings | null>(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && settings) {
      setDraft(settings);
    }
  }, [open, settings]);

  if (!draft) {
    return null;
  }

  const availableShells = shells.filter((shell) => shell.available);
  const selectedShell =
    availableShells.find((shell) => shell.id === draft.defaultShell) ??
    availableShells[0];

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(draft);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure PolarShell appearance and default shell.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label htmlFor="default-shell" className="text-sm font-medium">
              Default shell
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="justify-between">
                  {selectedShell?.name ?? "PowerShell"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableShells.map((shell) => (
                  <DropdownMenuItem
                    key={shell.id}
                    onClick={() =>
                      setDraft({ ...draft, defaultShell: shell.id })
                    }
                  >
                    {shell.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid gap-2">
            <label htmlFor="font-family" className="text-sm font-medium">
              Font family
            </label>
            <Input
              id="font-family"
              value={draft.fontFamily}
              onChange={(event) =>
                setDraft({ ...draft, fontFamily: event.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="font-size" className="text-sm font-medium">
              Font size
            </label>
            <Input
              id="font-size"
              type="number"
              min={8}
              max={32}
              value={draft.fontSize}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  fontSize: Number(event.target.value) || 14,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="scrollback" className="text-sm font-medium">
              Scrollback lines
            </label>
            <Input
              id="scrollback"
              type="number"
              min={1000}
              max={50000}
              value={draft.scrollback}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  scrollback: Number(event.target.value) || 10000,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => void handleSave()} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
