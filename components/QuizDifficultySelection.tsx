import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizDifficulty } from '../types/quiz';

interface QuizDifficultySelectionProps {
  onSelectDifficulty: (difficulty: QuizDifficulty) => void;
}

const difficulties = [
  {
    id: 'easy',
    title: 'Fácil',
    icon: '🌱',
    description: 'Questões básicas para iniciantes',
    color: '#2ECC71',
  },
  {
    id: 'medium',
    title: 'Médio',
    icon: '🌳',
    description: 'Desafio moderado para quem já conhece a Bíblia',
    color: '#FFD700',
  },
  {
    id: 'hard',
    title: 'Difícil',
    icon: '🌲',
    description: 'Questões complexas para especialistas',
    color: '#E74C3C',
  },
];

export function QuizDifficultySelection({ onSelectDifficulty }: QuizDifficultySelectionProps) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#3B5998', '#192F6A']} style={styles.gradient}>
        <Text style={styles.title}>Escolha a Dificuldade</Text>
        <View style={styles.difficultiesContainer}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.id}
              style={[styles.difficultyCard, { borderColor: difficulty.color }]}
              onPress={() => onSelectDifficulty(difficulty.id as QuizDifficulty)}>
              <Text style={styles.difficultyIcon}>{difficulty.icon}</Text>
              <Text style={styles.difficultyTitle}>{difficulty.title}</Text>
              <Text style={styles.difficultyDescription}>{difficulty.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    fontSize: 28,
    fontFamily: 'Nunito-ExtraBold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  difficultiesContainer: {
    gap: 20,
  },
  difficultyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  difficultyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  difficultyTitle: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  difficultyDescription: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    textAlign: 'center',
  },
});
