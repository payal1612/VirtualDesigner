import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,

      // Sign up
      signUp: async (email, password, fullName) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              }
            }
          });

          if (error) throw error;

          if (data.user) {
            set({ 
              user: data.user,
              session: data.session,
              isAuthenticated: !!data.session,
              isLoading: false 
            });
            return { success: true, user: data.user };
          }
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Sign in
      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({ 
            user: data.user,
            session: data.session,
            isAuthenticated: !!data.session,
            isLoading: false 
          });
          
          return { success: true, user: data.user };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Sign out
      signOut: async () => {
        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          set({ 
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Initialize auth state
      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          set({ 
            user: session?.user || null,
            session,
            isAuthenticated: !!session,
            isLoading: false 
          });

          // Listen for auth changes
          supabase.auth.onAuthStateChange((event, session) => {
            set({ 
              user: session?.user || null,
              session,
              isAuthenticated: !!session,
              isLoading: false 
            });
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ 
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      // Get user profile
      getProfile: async () => {
        const { user } = get();
        if (!user) return null;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          return data;
        } catch (error) {
          console.error('Error fetching profile:', error);
          return null;
        }
      },

      // Update user profile
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { success: false, error: 'Not authenticated' };

        try {
          const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);