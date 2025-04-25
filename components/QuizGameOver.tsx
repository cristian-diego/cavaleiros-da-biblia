import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizProgress } from '../types/quiz';

interface QuizGameOverProps {
  progress: QuizProgress;
  onRestart: () => void;
  onReturnToMenu: () => void;
}

export function QuizGameOver({ progress, onRestart, onReturnToMenu }: QuizGameOverProps) {
  const getResultMessage = () => {
    if (progress.isWin) {
      return 'Parabéns! Você venceu! 🎉';
    } else {
      return 'Não desista! Tente novamente! 💪';
    }
  };

  const getResultEmoji = () => {
    if (progress.isWin) {
      return '🏆';
    } else {
      return '😢';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#3B5998', '#192F6A']} style={styles.gradient}>
        <Text style={styles.title}>
          {getResultMessage()} {getResultEmoji()}
        </Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Sua Pontuação</Text>
          <Text style={styles.scoreValue}>⭐ {progress.score}</Text>
        </View>

        <View style={styles.xpContainer}>
          <Text style={styles.xpTitle}>XP Ganho</Text>
          <Text style={styles.xpValue}>✨ {progress.xp}</Text>
        </View>

        {progress.achievements.length > 0 && (
          <View style={styles.achievementsContainer}>
            <Text style={styles.achievementsTitle}>Conquistas Desbloqueadas 🏆</Text>
            {progress.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementText}>✨ {achievement}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={onRestart}>
            <Text style={styles.buttonText}>Jogar Novamente 🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.menuButton]} onPress={onReturnToMenu}>
            <Text style={styles.buttonText}>Voltar ao Menu 🏠</Text>
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
    fontSize: 36,
    fontFamily: 'Nunito-ExtraBold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 42,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  xpContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  xpTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    marginBottom: 10,
  },
  xpValue: {
    fontSize: 42,
    fontFamily: 'Nunito-Bold',
    color: '#9B59B6',
  },
  achievementsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  achievementsTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
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
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#333',
  },
  buttonsContainer: {
    width: '80%',
    gap: 15,
  },
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  restartButton: {
    backgroundColor: '#2ECC71',
  },
  menuButton: {
    backgroundColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
});
