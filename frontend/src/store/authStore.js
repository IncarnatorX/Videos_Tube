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

  getUserFromLocalStorage: () => {
    let userData = localStorage.getItem("user");
    if (userData) {
      let parsedUserData = JSON.parse(userData);
      set({ user: parsedUserData, userLoggedIn: true });
    } else {
      set({ user: null, userLoggedIn: false });
    }
  },
});

export const useAuthStore = create(authStore);
