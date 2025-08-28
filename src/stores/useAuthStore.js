import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData, authToken) => set({
    user: userData,
    token: authToken,
    isAuthenticated: true,
  }),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
}));

export default useAuthStore;