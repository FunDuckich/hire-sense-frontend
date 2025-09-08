import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, getMe } from '../api/authApi';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const data = await loginUser(email, password);
        const { access_token } = data;

        if (access_token) {
          set({ token: access_token, isAuthenticated: true });
          await get().fetchUser(); 
        }
      },
      
      fetchUser: async () => {
        try {
          const userData = await getMe();
          set({ user: userData });
        } catch (error) {
          console.error("Failed to fetch user", error);
          get().logout();
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;