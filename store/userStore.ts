import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserAttributes } from '@/types';

interface UserState {
  user: User | null;
  isOnboarded: boolean;
  setUser: (user: User) => void;
  addXp: (amount: number, attribute?: keyof UserAttributes) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const INITIAL_USER: User = {
  id: '',
  name: '',
  avatar: '',
  xp: 0,
  level: 1,
  attributes: {
    faith: 1,
    boldness: 1,
    wisdom: 1,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isOnboarded: false,
      
      setUser: (user) => set({ 
        user: {
          ...user, 
          updatedAt: new Date().toISOString()
        } 
      }),
      
      addXp: (amount, attribute) => {
        const { user } = get();
        if (!user) return;

        // Calculate new level based on XP
        const newXp = user.xp + amount;
        const newLevel = Math.floor(newXp / 100) + 1;
        
        // Update attribute if provided
        const newAttributes = { ...user.attributes };
        if (attribute) {
          newAttributes[attribute] = Math.min(10, newAttributes[attribute] + 1);
        }
        
        set({
          user: {
            ...user,
            xp: newXp,
            level: newLevel,
            attributes: newAttributes,
            updatedAt: new Date().toISOString(),
          },
        });
      },
      
      completeOnboarding: () => set({ isOnboarded: true }),
      
      reset: () => set({ user: null, isOnboarded: false }),
    }),
    {
      name: 'guardioes-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;