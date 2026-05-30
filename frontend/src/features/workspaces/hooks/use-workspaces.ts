import { useAtomValue } from 'jotai';
import { persistedWorkspacesAtom } from '@/features/workspaces/atoms/workspaces-storage-atoms';

export function useWorkspaces() {
  const workspaces = useAtomValue(persistedWorkspacesAtom);

  return {
    workspaces,
    hasWorkspaces: workspaces.length > 0,
  };
}
