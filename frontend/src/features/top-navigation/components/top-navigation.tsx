import { PanelLeft, Search, Settings } from "lucide-react";
import { AppLogo } from "@/features/app/components/app-logo";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { TopNavigationProps } from "@/features/top-navigation/types/top-navigation";

export function TopNavigation({
  shells,
  profilesOpen,
  onProfilesOpenChange,
  onOpenCommandPalette,
  onOpenSettings,
  onNewTab,
}: TopNavigationProps) {
  const availableShells = shells.filter((shell) => shell.available);

  return (
    <>
      <header className="flex h-10 items-center justify-between border-b border-border bg-[#262335] px-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <AppLogo />
          PolarShell
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open profiles"
                onClick={() => onProfilesOpenChange(true)}
              >
                <PanelLeft className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Profiles</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Command palette"
                onClick={onOpenCommandPalette}
              >
                <Search className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Command palette (Ctrl+Shift+P)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Settings"
                onClick={onOpenSettings}
              >
                <Settings className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings (Ctrl+,)</TooltipContent>
          </Tooltip>
        </div>
      </header>

      <Sheet open={profilesOpen} onOpenChange={onProfilesOpenChange}>
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
                  onProfilesOpenChange(false);
                }}
              >
                {shell.name}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
