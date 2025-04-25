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
import useUserStore from '../store/userStore';

interface QuizGameProps {
  onRestart: () => void;
  questions: QuizQuestion[];
  onGameOver: (progress: QuizProgress) => void;
  progress: QuizProgress;
  setProgress: React.Dispatch<React.SetStateAction<QuizProgress>>;
}

export function QuizGame({
  questions,
  onGameOver,
  progress,
  setProgress,
  onRestart,
}: QuizGameProps) {
  const router = useRouter();
  const addXp = useUserStore((state) => state.addXp);
  const [sound, setSound] = useState<Audio.Sound>();
  const [state, setState] = useState<QuizState>({
    questions,
    currentQuestion: null,
    progress,
    isGameOver: false,
    isGameWon: false,
    selectedCategory: null,
    selectedDifficulty: null,
  });

  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   setState((prev) => ({
  //     ...prev,
  //     questions,
  //     currentQuestion: questions[0] || null,
  //     progress: {
  //       ...progress,
  //       currentQuestionIndex: 0,
  //       score: 0,
  //       lives: 3,
  //       xp: 0,
  //       isWin: false,
  //     },
  //     isGameOver: false,
  //     isGameWon: false,
  //   }));
  // }, [questions]);

  useEffect(() => {
    if (state.isGameOver) {
      onGameOver(state.progress);
    }
  }, [state.isGameOver, state.progress, onGameOver]);

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
      const isLastQuestion = state.progress.currentQuestionIndex === state.questions.length - 1;
      const xpEarned = isLastQuestion ? 200 : 50;

      // Add XP to user's total
      addXp(xpEarned, 'wisdom');

      const newProgress = {
        ...state.progress,
        score: state.progress.score + 100,
        currentQuestionIndex: state.progress.currentQuestionIndex + 1,
        xp: state.progress.xp + xpEarned,
        isWin: isLastQuestion,
      };

      setProgress(newProgress);

      if (isLastQuestion) {
        setState((prev) => ({
          ...prev,
          progress: newProgress,
          currentQuestion: null,
          isGameWon: true,
          isGameOver: true,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          progress: newProgress,
          currentQuestion: state.questions[newProgress.currentQuestionIndex],
        }));
      }
    } else {
      const newLives = state.progress.lives - 1;
      const isGameOver = newLives <= 0;

      const newProgress = {
        ...state.progress,
        lives: newLives,
        isWin: false,
      };

      setProgress(newProgress);
      setState((prev) => ({
        ...prev,
        progress: newProgress,
        isGameOver,
      }));
    }
  };

  const renderNoQuestions = () => (
    <View style={styles.noQuestionsContainer}>
      <Text style={styles.noQuestionsTitle}>Ops! 😅</Text>
      <Text style={styles.noQuestionsText}>
        Não encontramos perguntas para esta categoria e dificuldade.
      </Text>
      <Text style={styles.noQuestionsSubtext}>Por favor, tente outra combinação!</Text>
      <TouchableOpacity style={styles.returnButton} onPress={onRestart}>
        <Text style={styles.returnButtonText}>Voltar para Categorias</Text>
      </TouchableOpacity>
    </View>
  );

  const renderQuestion = () => {
    if (questions.length === 0) {
      return renderNoQuestions();
    }

    if (!state.currentQuestion) {
      state.currentQuestion = state.questions[state.progress.currentQuestionIndex];
    }

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
        <Text style={styles.scoreText}>⭐ Pontuação: {state.progress.score}</Text>
        <Text style={styles.livesText}>❤️ Vidas: {state.progress.lives}</Text>
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
      <LinearGradient colors={['#4A90E2', '#3B5998', '#192F6A']} style={styles.gradient}>
        {questions.length > 0 && renderProgress()}
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
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  livesText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 6,
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: 'white',
  },
  noQuestionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginTop: 20,
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
  noQuestionsTitle: {
    fontSize: 32,
    fontFamily: 'Nunito-ExtraBold',
    color: '#333',
    marginBottom: 15,
  },
  noQuestionsText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  noQuestionsSubtext: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  returnButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});
