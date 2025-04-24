import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizProgress } from '../types/quiz';

interface QuizAchievementsProps {
  progress: QuizProgress;
}

const achievements = [
  {
    id: 'first_win',
    title: 'Primeira Vitória',
    description: 'Complete seu primeiro quiz com sucesso',
    icon: '🏆',
    condition: (progress: QuizProgress) => progress.score > 0,
  },
  {
    id: 'perfect_score',
    title: 'Pontuação Perfeita',
    description: 'Acertou todas as questões de um quiz',
    icon: '🌟',
    condition: (progress: QuizProgress) => progress.score >= 1000,
  },
  {
    id: 'survivor',
    title: 'Sobrevivente',
    description: 'Complete um quiz com apenas 1 vida restante',
    icon: '💪',
    condition: (progress: QuizProgress) => progress.lives === 1,
  },
  {
    id: 'bible_master',
    title: 'Mestre da Bíblia',
    description: 'Complete todas as categorias',
    icon: '📚',
    condition: (progress: QuizProgress) => progress.completedCategories.length === 6,
  },
  {
    id: 'speed_runner',
    title: 'Corredor Veloz',
    description: 'Complete um quiz em menos de 2 minutos',
    icon: '⚡',
    condition: (progress: QuizProgress) => progress.score > 500,
  },
];

export function QuizAchievements({ progress }: QuizAchievementsProps) {
  const unlockedAchievements = achievements.filter((achievement) =>
    achievement.condition(progress)
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <Text style={styles.title}>Conquistas</Text>
        <ScrollView style={styles.achievementsList}>
          {achievements.map((achievement) => {
            const isUnlocked = unlockedAchievements.some((a) => a.id === achievement.id);

            return (
              <View
                key={achievement.id}
                style={[styles.achievementCard, !isUnlocked && styles.lockedAchievement]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                {!isUnlocked && <Text style={styles.lockedText}>Bloqueado</Text>}
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  lockedText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
