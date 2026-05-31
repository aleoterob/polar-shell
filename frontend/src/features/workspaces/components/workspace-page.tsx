import { FolderCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WorkspacePage() {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-full min-h-0 flex-1 transform-gpu items-start justify-center overflow-auto rounded-tl-lg bg-page-background p-8 shadow-[inset_0.5px_0.5px_0_0_color-mix(in_oklab,var(--muted-foreground)_35%,transparent)]">
      <div className="flex w-full max-w-sm flex-col items-start">
        <div className="w-full transform-gpu pb-4 shadow-[inset_0_-0.5px_0_0_color-mix(in_oklab,var(--muted-foreground)_50%,transparent)]">
          <h1 className="m-0 p-0 font-semibold tracking-tight">
            <div className="flex h-7 items-center gap-2.5">
              <FolderCode className="block size-6 shrink-0" aria-hidden />
              <span className="text-xl leading-none">{t('workspaces.pageTitle')}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
