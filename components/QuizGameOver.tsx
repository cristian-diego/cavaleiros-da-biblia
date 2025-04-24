import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizProgress } from '../types/quiz';

interface QuizGameOverProps {
  progress: QuizProgress;
  onRestart: () => void;
  onReturnToMenu: () => void;
}

export function QuizGameOver({ progress, onRestart, onReturnToMenu }: QuizGameOverProps) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <Text style={styles.title}>Fim do Quiz!</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Sua Pontuação</Text>
          <Text style={styles.scoreValue}>{progress.score}</Text>
        </View>

        {progress.achievements.length > 0 && (
          <View style={styles.achievementsContainer}>
            <Text style={styles.achievementsTitle}>Conquistas Desbloqueadas</Text>
            {progress.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementText}>🏆 {achievement}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={onRestart}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.menuButton]} onPress={onReturnToMenu}>
            <Text style={styles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  scoreContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  achievementItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  achievementText: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    width: '80%',
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
  menuButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
