import { create } from "zustand";
import api from "../utils/api";

const videoStore = (set) => ({
  detailsUpdated: false,
  videos: [],
  userVideos: [],
  currentVideoID: "",
  currentVideo: (() => {
    const video = localStorage.getItem("video");
    return video ? JSON.parse(video) : {};
  })(),

  setDetailsUpdated: () =>
    set((state) => ({ detailsUpdated: !state.detailsUpdated })),
  setVideos: (videos) => set({ videos }),
  setCurrentVideo: (video) => set(() => ({ currentVideo: video })),
  setCurrentVideoID: (id) => set(() => ({ currentVideoID: id })),
  setUserVideos: (video) => set(() => ({ userVideos: video })),

  fetchAllVideos: async () => {
    try {
      const response = await api.get("/getAllVideos");
      set(() => ({ videos: response.data }));
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  },
});

export const useVideoStore = create(videoStore);
