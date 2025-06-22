import { create } from "zustand";

const authStore = (set) => ({
  userLoggedIn: false,
  user: (() => {
    let userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  })(),
  accessToken: null,

  setUserLoggedIn: (value) => set(() => ({ userLoggedIn: value })),
  setUser: (userData) => set(() => ({ user: userData })),
  setAccessToken: (token) => set(() => ({ accessToken: token })),
});

export const useAuthStore = create(authStore);
