import { atom } from 'jotai';

export type SettingsSection = 'general' | 'languages';

export const settingsSectionAtom = atom<SettingsSection>('general');
