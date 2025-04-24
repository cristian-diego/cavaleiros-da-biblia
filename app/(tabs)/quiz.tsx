import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { QuizGame } from '../../components/QuizGame';
import { QuizCategorySelection } from '../../components/QuizCategorySelection';
import { QuizDifficultySelection } from '../../components/QuizDifficultySelection';
import { QuizGameOver } from '../../components/QuizGameOver';
import { QuizAchievements } from '../../components/QuizAchievements';
import { QuizQuestion, QuizCategory, QuizDifficulty, QuizProgress } from '../../types/quiz';
import { quizQuestions } from '../../data/quizQuestions';

type GameState = 'category' | 'difficulty' | 'playing' | 'gameOver' | 'achievements';

export default function QuizTab() {
  const [gameState, setGameState] = useState<GameState>('category');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | null>(null);
  const [progress, setProgress] = useState<QuizProgress>({
    score: 0,
    lives: 3,
    currentQuestionIndex: 0,
    completedCategories: [],
    achievements: [],
  });

  const handleCategorySelect = (category: QuizCategory) => {
    setSelectedCategory(category);
    setGameState('difficulty');
  };

  const handleDifficultySelect = (difficulty: QuizDifficulty) => {
    setSelectedDifficulty(difficulty);
    setGameState('playing');
  };

  const handleGameOver = (finalProgress: QuizProgress) => {
    setProgress(finalProgress);
    setGameState('gameOver');
  };

  const handleRestart = () => {
    setProgress({
      score: 0,
      lives: 3,
      currentQuestionIndex: 0,
      completedCategories: [],
      achievements: [],
    });
    setGameState('category');
  };

  const handleReturnToMenu = () => {
    setGameState('category');
  };

  const handleShowAchievements = () => {
    setGameState('achievements');
  };

  const filteredQuestions = true
    ? quizQuestions
    : quizQuestions.filter(
        (question) =>
          (!selectedCategory || question.category === selectedCategory) &&
          (!selectedDifficulty || question.difficulty === selectedDifficulty)
      );

  return (
    <View style={styles.container}>
      {gameState === 'category' && (
        <QuizCategorySelection onSelectCategory={handleCategorySelect} />
      )}

      {gameState === 'difficulty' && (
        <QuizDifficultySelection onSelectDifficulty={handleDifficultySelect} />
      )}

      {gameState === 'playing' && (
        <QuizGame
          questions={filteredQuestions}
          onGameOver={handleGameOver}
          progress={progress}
          setProgress={setProgress}
        />
      )}

      {gameState === 'gameOver' && (
        <QuizGameOver
          progress={progress}
          onRestart={handleRestart}
          onReturnToMenu={handleReturnToMenu}
        />
      )}

      {gameState === 'achievements' && <QuizAchievements progress={progress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
