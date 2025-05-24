import { create } from "zustand";

const videoStore = (set) => ({
  detailsUpdated: false,
  videos: [],
  currentVideoID: "",
  currentVideo: (() => {
    const video = localStorage.getItem("video");
    return video ? JSON.parse(video) : {};
  })(),
  setVideos: (videos) => set({ videos }),
  setDetailsUpdated: () =>
    set((state) => ({ detailsUpdated: !state.detailsUpdated })),
  setCurrentVideo: (video) => set(() => ({ currentVideo: video })),
  setCurrentVideoID: (id) => set(() => ({ currentVideoID: id })),
});

export const useVideoStore = create(videoStore);
