import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
    color: '#4CAF50',
  },
  {
    id: 'medium',
    title: 'Médio',
    icon: '🌳',
    description: 'Desafio moderado para quem já conhece a Bíblia',
    color: '#FFC107',
  },
  {
    id: 'hard',
    title: 'Difícil',
    icon: '🌲',
    description: 'Questões complexas para especialistas',
    color: '#F44336',
  },
];

export function QuizDifficultySelection({ onSelectDifficulty }: QuizDifficultySelectionProps) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  difficultiesContainer: {
    gap: 20,
  },
  difficultyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  difficultyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  difficultyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  difficultyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
