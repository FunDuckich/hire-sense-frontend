import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser } from '../api/authApi';

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