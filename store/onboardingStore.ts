import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
}

const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardingStore;
