import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import useMissionStore from '@/store/missionStore';
import useUserStore from '@/store/userStore';
import MissionItem from '@/components/ui/MissionItem';
import Button from '@/components/ui/Button';
import { Mission } from '@/types';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { router } from 'expo-router';
export default function MissionsScreen() {
  const { missions, completeMission, resetMissions } = useMissionStore();
  const { user, addXp, reset } = useUserStore();
  const [showingReward, setShowingReward] = useState<Mission | null>(null);

  const handleCompleteMission = (id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;

    // Mark mission as completed
    completeMission(id);

    // Award XP
    addXp(mission.xpReward, mission.attribute);

    // Show reward notification
    setShowingReward(mission);

    // Hide reward notification after 2 seconds
    setTimeout(() => {
      setShowingReward(null);
    }, 2000);
  };

  const handleResetMissions = () => {
    reset();
    router.replace('/onboarding');
    return;

    Alert.alert(
      'Reiniciar Missões',
      'Tem certeza que deseja reiniciar todas as missões? Isso vai apagar seu progresso de hoje.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim, reiniciar',
          onPress: () => resetMissions(),
        },
      ]
    );
  };

  const allCompleted = missions.every((mission) => mission.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Missões Diárias</Text>
          {allCompleted && (
            <Text style={styles.completedText}>
              Parabéns! Você completou todas as missões de hoje!
            </Text>
          )}
        </View>

        <ScrollView
          style={styles.missionsList}
          contentContainerStyle={styles.missionsContent}
          showsVerticalScrollIndicator={false}>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} onComplete={handleCompleteMission} />
          ))}

          <Button
            title="Reiniciar Missões"
            variant="outline"
            onPress={handleResetMissions}
            style={styles.resetButton}
          />
        </ScrollView>

        {/* XP Reward Notification */}
        {showingReward && (
          <Animated.View
            entering={FadeInDown.duration(300)}
            exiting={FadeOutUp.duration(300)}
            style={styles.rewardContainer}>
            <Text style={styles.rewardText}>+{showingReward.xpReward} XP</Text>
            <Text style={styles.attributeText}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#2C3E85',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  completedText: {
    fontSize: 16,
    color: '#CFB53B',
  },
  missionsList: {
    flex: 1,
  },
  missionsContent: {
    padding: 16,
    paddingBottom: 32,
  },
  resetButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
  rewardContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(207, 181, 59, 0.9)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  rewardText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  attributeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
