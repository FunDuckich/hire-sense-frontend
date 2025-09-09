import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {loginUser} from "../api/authApi.js";

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,

            login: async (email, password) => {
                const data = await loginUser(email, password);
                const {access_token, user} = data;

                if (access_token && user) {
                    set({token: access_token, user: user, isAuthenticated: true});
                    return user;
                }

                throw new Error("Login failed: no token or user data");
            },

            logout: () => {
                set({token: null, user: null, isAuthenticated: false});
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;