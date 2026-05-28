import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { ShellProfile } from "@/services/terminalBridge";
import type { ShellId } from "@/types/terminal";

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shells: ShellProfile[];
  onNewTab: (shellId: ShellId) => void;
}

export function AppSidebar({
  open,
  onOpenChange,
  shells,
  onNewTab,
}: AppSidebarProps) {
  const availableShells = shells.filter((shell) => shell.available);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Profiles</SheetTitle>
          <SheetDescription>
            Launch a new terminal with a specific shell.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2">
          {availableShells.map((shell) => (
            <Button
              key={shell.id}
              variant="secondary"
              className="justify-start"
              onClick={() => {
                onNewTab(shell.id);
                onOpenChange(false);
              }}
            >
              {shell.name}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
