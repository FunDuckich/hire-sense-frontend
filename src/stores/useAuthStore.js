import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await apiClient.post('/auth/login', params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token } = response.data;
        if (access_token) {
          set({ token: access_token, isAuthenticated: true });
          await get().fetchUser(); 
        }
      },
      
      fetchUser: async () => {
        const state = useAuthStore.getState();
        if (state.token) {
            try {
                const payload = JSON.parse(atob(state.token.split('.')[1]));
                const userRole = payload.sub.includes('hr') ? 'HR' : 'CANDIDATE';
                 set({ user: { email: payload.sub, role: userRole } });
            } catch (e) {
                console.error("Failed to decode token for stub", e)
                set({ user: { role: 'CANDIDATE' } });
            }
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