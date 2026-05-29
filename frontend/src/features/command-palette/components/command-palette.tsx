import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command";
import type { CommandPaletteProps } from "@/features/command-palette/types/command-palette";

export function CommandPalette({
  open,
  onOpenChange,
  shells,
  onNewTab,
  onOpenSettings,
  onSearchTerminal,
}: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  const availableShells = shells.filter((shell) => shell.available);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Search commands and actions"
    >
      <Command>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Terminal">
            <CommandItem
              onSelect={() => {
                onNewTab("powershell");
                onOpenChange(false);
              }}
            >
              New PowerShell tab
            </CommandItem>
            {searchQuery ? (
              <CommandItem
                onSelect={() => {
                  onSearchTerminal?.(searchQuery);
                  onOpenChange(false);
                }}
              >
                Find in terminal: {searchQuery}
              </CommandItem>
            ) : null}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Shells">
            {availableShells.map((shell) => (
              <CommandItem
                key={shell.id}
                onSelect={() => {
                  onNewTab(shell.id);
                  onOpenChange(false);
                }}
              >
                New {shell.name} tab
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Application">
            <CommandItem
              onSelect={() => {
                onOpenSettings();
                onOpenChange(false);
              }}
            >
              Open settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
