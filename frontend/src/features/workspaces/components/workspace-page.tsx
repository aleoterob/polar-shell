import { FolderCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WorkspacePage() {
  const { t } = useTranslation();

  return (
    <div className="settings-page-content flex h-full min-h-0 flex-1 items-start justify-center overflow-auto p-8">
      <div className="flex w-full max-w-sm flex-col items-start">
        <div className="settings-languages-title-divider">
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
