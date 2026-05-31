import { Window } from '@wailsio/runtime';
import { Minus, Square, X, SquareMenu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const mainTopBarInteractiveClassName =
  'inline-flex h-7 w-8 items-center justify-center rounded-sm p-1.5 text-sidebar-foreground transition-colors [--wails-draggable:no-drag] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring';

function runWindowAction(action: () => Promise<void>) {
  void action();
}

export function AppTitleBar() {
  const { t } = useTranslation();

  return (
    <header
      className="flex h-8 shrink-0 select-none items-center justify-between bg-background text-foreground [--wails-draggable:drag]"
      onDoubleClick={() => runWindowAction(() => Window.ToggleMaximise())}
    >
      <div className="flex min-w-0 items-center gap-2 px-2">
        <button
          type="button"
          className={mainTopBarInteractiveClassName}
          aria-label="Menu"
        >
          <SquareMenu className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex h-full shrink-0 items-center">
        <button
          type="button"
          className={mainTopBarInteractiveClassName}
          aria-label={t('window.minimize')}
          title={t('window.minimize')}
          onClick={() => runWindowAction(() => Window.Minimise())}
        >
          <Minus className="size-3.5" aria-hidden />
        </button>
        <button
          type="button"
          className={mainTopBarInteractiveClassName}
          aria-label={t('window.maximize')}
          title={t('window.maximize')}
          onClick={() => runWindowAction(() => Window.ToggleMaximise())}
        >
          <Square className="size-3" aria-hidden />
        </button>
        <button
          type="button"
          className={mainTopBarInteractiveClassName}
          aria-label={t('window.close')}
          title={t('window.close')}
          onClick={() => runWindowAction(() => Window.Close())}
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}
