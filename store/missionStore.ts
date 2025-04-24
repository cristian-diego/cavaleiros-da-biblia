import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mission } from '@/types';

interface MissionState {
  missions: Mission[];
  lastUpdated: string | null;
  completeMission: (id: string) => void;
  resetMissions: () => void;
  resetDailyMissions: () => void;
}

const DAILY_MISSIONS: Mission[] = [
  {
    id: 'devotional',
    title: 'Devotional Reading',
    description: 'Read the Bible or a devotional for at least 10 minutes',
    completed: false,
    xpReward: 20,
    attribute: 'wisdom',
  },
  {
    id: 'prayer',
    title: 'Personal Prayer',
    description: 'Spend time in prayer talking to God',
    completed: false,
    xpReward: 20,
    attribute: 'faith',
  },
  {
    id: 'family-worship',
    title: 'Family Worship',
    description: 'Participate in family worship or share what you learned with family',
    completed: false,
    xpReward: 30,
    attribute: 'boldness',
  },
];

const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      missions: DAILY_MISSIONS,
      lastUpdated: null,
      
      completeMission: (id) => {
        const { missions } = get();
        const updatedMissions = missions.map(mission => 
          mission.id === id ? { ...mission, completed: true } : mission
        );
        
        set({ 
          missions: updatedMissions,
          lastUpdated: new Date().toISOString(),
        });
      },
      
      resetMissions: () => set({ 
        missions: DAILY_MISSIONS,
        lastUpdated: new Date().toISOString(),
      }),
      
      resetDailyMissions: () => {
        const now = new Date();
        const { lastUpdated } = get();
        
        // If lastUpdated is null or from a different day, reset missions
        if (!lastUpdated) {
          set({ 
            missions: DAILY_MISSIONS,
            lastUpdated: now.toISOString(),
          });
          return;
        }
        
        const lastDate = new Date(lastUpdated);
        if (
          lastDate.getDate() !== now.getDate() ||
          lastDate.getMonth() !== now.getMonth() ||
          lastDate.getFullYear() !== now.getFullYear()
        ) {
          set({ 
            missions: DAILY_MISSIONS,
            lastUpdated: now.toISOString(),
          });
        }
      },
    }),
    {
      name: 'guardioes-mission-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useMissionStore;