import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: { name: 'Тестовый HR', role: 'HR' }, // или 'CANDIDATE'
  token: 'fake-token',
  isAuthenticated: true,

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