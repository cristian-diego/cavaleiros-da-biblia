export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  bibleReference: string;
  explanation: string;
}

export type QuizCategory =
  | 'old-testament'
  | 'new-testament'
  | 'characters'
  | 'verses'
  | 'history'
  | 'teachings';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizProgress {
  score: number;
  lives: number;
  currentQuestionIndex: number;
  completedCategories: QuizCategory[];
  achievements: string[];
  xp: number;
  isWin: boolean;
}

export interface QuizAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: QuizProgress) => boolean;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion | null;
  progress: QuizProgress;
  isGameOver: boolean;
  isGameWon: boolean;
  selectedCategory: QuizCategory | null;
  selectedDifficulty: QuizDifficulty | null;
}
