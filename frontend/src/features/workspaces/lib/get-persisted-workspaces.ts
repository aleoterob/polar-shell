import { STORAGE_KEY_WORKSPACES } from '@/features/workspaces/atoms/workspaces-storage-atoms';
import type { Workspace } from '@/features/workspaces/types/workspace';

function isWorkspace(value: unknown): value is Workspace {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.createdAt === 'string'
  );
}

export function getPersistedWorkspaces(): Workspace[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WORKSPACES);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isWorkspace);
  } catch {
    return [];
  }
}

export function hasPersistedWorkspaces(): boolean {
  return getPersistedWorkspaces().length > 0;
}
