import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useMissionStore from '@/store/missionStore';
import useUserStore from '@/store/userStore';
import MissionItem from '@/components/ui/MissionItem';
import { Mission } from '@/types';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Star, Award, Gift, Sparkles, Calendar, Trophy, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';

export default function MissionsScreen() {
  const { missions, completeMission } = useMissionStore();
  const { user, addXp } = useUserStore();
  const [showingReward, setShowingReward] = useState<Mission | null>(null);
  const insets = useSafeAreaInsets();

  // Get current month name in Portuguese
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' });

  // Mock monthly stats (you should replace these with real data from your store)
  const monthlyStats = {
    completedDays: 15,
    totalXP: 1250,
    streak: 7,
    achievements: 3,
  };

  const handleCompleteMission = (id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;

    completeMission(id);
    addXp(mission.xpReward, mission.attribute);
    setShowingReward(mission);

    setTimeout(() => {
      setShowingReward(null);
    }, 2000);
  };

  const allCompleted = missions.every((mission) => mission.completed);
  const completedCount = missions.filter((m) => m.completed).length;
  const totalMissions = missions.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header Section */}
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          className="rounded-b-kid-xl px-4 pb-6"
          style={{ paddingTop: insets.top + 16 }}>
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-kid-xl font-bold capitalize text-white">{currentMonth}</Text>
              <View className="flex-row items-center">
                <Calendar size={20} color="#FFD700" className="mr-2" />
                <Text className="text-kid-base text-white">Dia {new Date().getDate()}</Text>
              </View>
            </View>
            <View className="animate-bounce-soft">
              <Star size={32} color="#FFD700" />
            </View>
          </View>

          {/* Monthly Stats Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <Card className="mr-3 min-w-[120px] bg-white/10 p-3">
              <View className="items-center">
                <Trophy size={24} color="#FFD700" />
                <Text className="mt-2 text-kid-xl font-bold text-white">
                  {monthlyStats.completedDays}
                </Text>
                <Text className="text-center text-kid-sm text-white/80">Dias{'\n'}Completados</Text>
              </View>
            </Card>

            <Card className="mr-3 min-w-[120px] bg-white/10 p-3">
              <View className="items-center">
                <Target size={24} color="#FFD700" />
                <Text className="mt-2 text-kid-xl font-bold text-white">{monthlyStats.streak}</Text>
                <Text className="text-center text-kid-sm text-white/80">Dias{'\n'}Seguidos</Text>
              </View>
            </Card>

            <Card className="mr-3 min-w-[120px] bg-white/10 p-3">
              <View className="items-center">
                <Award size={24} color="#FFD700" />
                <Text className="mt-2 text-kid-xl font-bold text-white">
                  {monthlyStats.totalXP}
                </Text>
                <Text className="text-center text-kid-sm text-white/80">XP{'\n'}do Mês</Text>
              </View>
            </Card>
          </ScrollView>
        </LinearGradient>

        {/* Today's Missions Section */}
        <View className="px-4 pt-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-kid-lg font-bold text-kid-blue">Missões de Hoje</Text>
            <View className="flex-row items-center rounded-full bg-kid-yellow/10 px-3 py-1">
              <Trophy size={16} color="#FFD700" className="mr-2" />
              <Text className="font-semibold text-kid-yellow">
                {completedCount}/{totalMissions}
              </Text>
            </View>
          </View>

          {allCompleted && (
            <View className="mb-4 rounded-kid bg-kid-green/10 p-3">
              <View className="flex-row items-center justify-center">
                <Sparkles size={20} color="#2ECC71" className="mr-2" />
                <Text className="text-kid-base font-bold text-kid-green">
                  Parabéns! Você completou todas as missões!
                </Text>
              </View>
            </View>
          )}

          <ScrollView
            className="pt-2"
            contentContainerClassName="pb-8"
            showsVerticalScrollIndicator={false}>
            {missions.map((mission) => (
              <MissionItem key={mission.id} mission={mission} onComplete={handleCompleteMission} />
            ))}
          </ScrollView>
        </View>

        {/* XP Reward Notification */}
        {showingReward && (
          <Animated.View
            entering={FadeInDown.duration(300)}
            exiting={FadeOutUp.duration(300)}
            className="absolute top-24 items-center self-center rounded-kid-lg bg-kid-yellow/90 p-4 shadow-lg">
            <View className="mb-2 flex-row items-center">
              <Gift size={24} color="#FFFFFF" className="mr-2" />
              <Text className="text-kid-lg font-bold text-white">+{showingReward.xpReward} XP</Text>
            </View>
            <Text className="text-kid-base font-semibold text-white">
              +1{' '}
              {showingReward.attribute === 'faith'
                ? 'Fé'
                : showingReward.attribute === 'boldness'
                  ? 'Coragem'
                  : 'Sabedoria'}
            </Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
