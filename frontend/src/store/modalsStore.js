import { create } from "zustand";

const modalsStore = (set) => ({
  uploadVideoModal: { status: false, helperData: null },

  openUploadVideoModal: () =>
    set((state) => ({
      uploadVideoModal: { status: true, helperData: state?.data },
    })),
  closeUploadVideoModal: () =>
    set(() => ({ uploadVideoModal: { status: false, helperData: null } })),
});

export const useModalsStore = create(modalsStore);
