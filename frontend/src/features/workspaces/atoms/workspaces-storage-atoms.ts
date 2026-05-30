import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { Workspace } from '@/features/workspaces/types/workspace';

export const STORAGE_KEY_WORKSPACES = 'polarshell:workspaces';

const jsonStorage = createJSONStorage<Workspace[]>(() => localStorage);

export const persistedWorkspacesAtom = atomWithStorage<Workspace[]>(
  STORAGE_KEY_WORKSPACES,
  [],
  jsonStorage,
);
