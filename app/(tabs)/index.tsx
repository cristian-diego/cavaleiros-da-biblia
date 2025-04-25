import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUserStore from '@/store/userStore';
import useMissionStore from '@/store/missionStore';
import ProgressBar from '@/components/ui/ProgressBar';
import VerseCard from '@/components/ui/VerseCard';
import { getDailyVerse } from '@/data/bibleVerses';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { Star, Trophy, Gift } from 'lucide-react-native';
import KidButton from '@/components/ui/KidButton';

export default function DashboardScreen() {
  const { user } = useUserStore();
  const { missions, resetDailyMissions } = useMissionStore();
  const insets = useSafeAreaInsets();

  // Get daily verse
  const dailyVerse = getDailyVerse();

  // Calculate XP percentage for level progress
  const calculateLevelProgress = () => {
    if (!user) return 0;

    const currentLevelXp = (user.level - 1) * 100;
    const nextLevelXp = user.level * 100;
    const xpInCurrentLevel = user.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;

    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };

  // Calculate completed missions
  const completedMissions = missions.filter((m) => m.completed).length;

  // Reset daily missions if needed
  useEffect(() => {
    resetDailyMissions();
  }, []);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="kid-text">Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="pb-6">
        {/* Header Section */}
        <View
          className="rounded-b-kid-xl bg-kid-blue px-4 pb-6"
          style={{ paddingTop: insets.top + 16 }} // Add extra padding to account for status bar
        >
          <View className="mb-4 flex-row items-center">
            <View className="relative">
              <View className="animate-bounce-soft">
                <Image
                  source={{ uri: user.avatar }}
                  className="border-3 h-16 w-16 rounded-full border-kid-yellow"
                />
              </View>
              <View className="absolute -bottom-1 -right-1 rounded-full bg-kid-yellow p-1.5">
                <Star size={14} color="#FFF" />
              </View>
            </View>
            <View className="ml-3">
              <Text className="text-kid-lg font-bold text-white">Olá, {user.name}!</Text>
              <Text className="text-kid-base text-kid-yellow">Nível {user.level}</Text>
            </View>
          </View>

          {/* XP Progress */}
          <View className="mt-2 rounded-kid bg-white/20 p-3">
            <View className="mb-2 flex-row justify-between">
              <Text className="font-semibold text-white">XP</Text>
              <Text className="animate-pulse font-bold text-kid-yellow">{user.xp}</Text>
            </View>
            <ProgressBar progress={calculateLevelProgress()} />
          </View>
        </View>

        {/* Daily Verse Card */}
        <View className="mt-6 px-4">
          <VerseCard verse={dailyVerse} />
        </View>

        {/* Stats Section */}
        <View className="mt-6 px-4">
          <Text className="kid-subtitle mb-3 flex-row items-center">
            <Trophy size={24} color="#FFD700" className="mr-2" />
            Suas Missões de Hoje
          </Text>

          <Card className="kid-card animate-float flex-row justify-between py-4">
            <View className="flex-1 items-center">
              <Text className="mb-1 animate-pulse text-kid-xl font-bold text-kid-yellow">
                {completedMissions}
              </Text>
              <Text className="text-center text-kid-sm text-gray-600">Missões{'\n'}Completas</Text>
            </View>

            <View className="mx-2 w-[1px] bg-gray-200" />

            <View className="flex-1 items-center">
              <Text className="mb-1 text-kid-xl font-bold text-kid-orange">
                {missions.length - completedMissions}
              </Text>
              <Text className="text-center text-kid-sm text-gray-600">Missões{'\n'}Restantes</Text>
            </View>

            <View className="mx-2 w-[1px] bg-gray-200" />

            <View className="flex-1 items-center">
              <Text className="mb-1 text-kid-xl font-bold text-kid-green">
                {missions.reduce((acc, mission) => {
                  return mission.completed ? acc + mission.xpReward : acc;
                }, 0)}
              </Text>
              <Text className="text-center text-kid-sm text-gray-600">XP{'\n'}Ganho</Text>
            </View>
          </Card>

          <KidButton
            title="Ver Missões"
            variant="secondary"
            onPress={() => router.push('/(tabs)/missions')}
          />
        </View>

        {/* Rewards Preview */}
        <View className="mt-8 px-4">
          <Card className="kid-card bg-white p-4">
            <View className="flex-row items-center">
              <Gift size={24} color="#FFD700" />
              <Text className="ml-2 text-kid-lg text-gray-700">Próxima Recompensa</Text>
            </View>
            <Text className="mt-2 text-gray-600">
              Complete mais {3 - completedMissions} missões para desbloquear uma surpresa especial!
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
