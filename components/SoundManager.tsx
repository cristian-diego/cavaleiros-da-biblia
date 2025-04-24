import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

type SoundType = 'correct' | 'wrong' | 'gameOver' | 'achievement';

interface SoundManagerProps {
  playSound: (type: SoundType) => void;
}

export function useSoundManager() {
  const [sounds, setSounds] = useState<Record<SoundType, Audio.Sound | null>>({
    correct: null,
    wrong: null,
    gameOver: null,
    achievement: null,
  });

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const soundFiles = {
          correct: require('../assets/sounds/correct.mp3'),
          wrong: require('../assets/sounds/wrong.mp3'),
          gameOver: require('../assets/sounds/gameOver.mp3'),
          achievement: require('../assets/sounds/achievement.mp3'),
        };

        const loadedSounds = await Promise.all(
          Object.entries(soundFiles).map(async ([key, file]) => {
            const { sound } = await Audio.Sound.createAsync(file);
            return [key, sound];
          })
        );

        setSounds(Object.fromEntries(loadedSounds));
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    };

    loadSounds();

    return () => {
      Object.values(sounds).forEach((sound) => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  const playSound = async (type: SoundType) => {
    try {
      const sound = sounds[type];
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.error(`Error playing ${type} sound:`, error);
    }
  };

  return { playSound };
}
