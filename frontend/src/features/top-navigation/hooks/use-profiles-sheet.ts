import { useAtomValue, useSetAtom } from "jotai";
import { profilesOpenAtom } from "@/features/top-navigation/atoms/atoms";

export function useProfilesSheet() {
  const profilesOpen = useAtomValue(profilesOpenAtom);
  const setProfilesOpen = useSetAtom(profilesOpenAtom);

  return { profilesOpen, setProfilesOpen };
}
