import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  session: any | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  setSession: (session: any | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  loading: true,
  initialized: false,
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },
}));

// Initialize auth state
export const initializeAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  useAuthStore.getState().setSession(session);
  
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    useAuthStore.getState().setProfile(profile);
  }
  
  useAuthStore.getState().setLoading(false);
  useAuthStore.getState().setInitialized(true);
  
  // Set up auth state change listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    useAuthStore.getState().setSession(session);
    
    if (event === 'SIGNED_IN' && session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      useAuthStore.getState().setProfile(profile);
    }
    
    if (event === 'SIGNED_OUT') {
      useAuthStore.getState().setProfile(null);
    }
  });
};