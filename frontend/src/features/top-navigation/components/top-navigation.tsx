import { AppLogo } from "@/features/app/components/app-logo";

export function TopNavigation() {
  return (
    <header className="flex h-10 items-center border-b border-border bg-background px-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <AppLogo />
        PolarShell
      </div>
    </header>
  );
}
