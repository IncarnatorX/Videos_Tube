import { create } from "zustand";

const avatarStore = (set) => ({
  avatarFile: null,
  avatarPreviewFile: null,
  setAvatarFile: (avatar) =>
    set(() => {
      return { avatarFile: avatar };
    }),
  setAvatarPreviewFile: (preview) =>
    set(() => {
      return { avatarPreviewFile: preview };
    }),
});

export const useAvatarStore = create(avatarStore);
