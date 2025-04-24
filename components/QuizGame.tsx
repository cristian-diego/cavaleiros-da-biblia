import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { quizQuestions } from '../data/quizQuestions';
import { QuizQuestion, QuizState, QuizProgress } from '../types/quiz';

const { width } = Dimensions.get('window');

export function QuizGame() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound>();
  const [state, setState] = useState<QuizState>({
    questions: quizQuestions,
    currentQuestion: null,
    progress: {
      score: 0,
      lives: 3,
      currentQuestionIndex: 0,
      completedCategories: [],
      achievements: [],
    },
    isGameOver: false,
    isGameWon: false,
    selectedCategory: null,
    selectedDifficulty: null,
  });

  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadSounds();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  async function loadSounds() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/correct.mp3')
    );
    setSound(newSound);
  }

  const playSound = async () => {
    try {
      await sound?.replayAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!state.currentQuestion) return;

    const isCorrect = selectedIndex === state.currentQuestion.correctAnswer;

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (isCorrect) {
      playSound();
      setState((prev) => ({
        ...prev,
        isGameWon: prev.progress.currentQuestionIndex === prev.questions.length - 1,
        progress: {
          ...prev.progress,
          score: prev.progress.score + 100,
          currentQuestionIndex: prev.progress.currentQuestionIndex + 1,
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          lives: prev.progress.lives - 1,
        },
      }));
    }

    if (state.progress.lives <= 1) {
      setState((prev) => ({ ...prev, isGameOver: true, isGameWon: false }));
    }
  };

  const renderQuestion = () => {
    state.currentQuestion = state.questions[state.progress.currentQuestionIndex];
    if (!state.currentQuestion) return null;

    return (
      <Animated.View
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}>
        <Text style={styles.questionText}>{state.currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {state.currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(index)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  };

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Pontuação: {state.progress.score}</Text>
        <Text style={styles.livesText}>Vidas: {state.progress.lives}</Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${(state.progress.currentQuestionIndex / state.questions.length) * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        {renderProgress()}
        {renderQuestion()}
      </LinearGradient>
    </SafeAreaView>
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
  progressContainer: {
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  livesText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
