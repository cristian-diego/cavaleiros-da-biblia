import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Quem foi o primeiro rei de Israel?',
    options: ['Saul', 'Davi', 'Salomão', 'Josué'],
    correctAnswer: 0,
    category: 'old-testament',
    difficulty: 'easy',
    bibleReference: '1 Samuel 10:1',
    explanation:
      'Saul foi ungido por Samuel como o primeiro rei de Israel, conforme descrito em 1 Samuel 10:1.',
  },
  {
    id: '2',
    question: 'Qual foi o milagre que Jesus realizou nas bodas de Caná?',
    options: [
      'Multiplicação dos pães',
      'Transformação da água em vinho',
      'Cura do cego de nascença',
      'Ressurreição de Lázaro',
    ],
    correctAnswer: 1,
    category: 'new-testament',
    difficulty: 'easy',
    bibleReference: 'João 2:1-11',
    explanation:
      'Jesus transformou água em vinho durante as bodas de Caná, sendo este seu primeiro milagre registrado.',
  },
  {
    id: '3',
    question: 'Qual profeta foi engolido por um grande peixe?',
    options: ['Elias', 'Jeremias', 'Jonas', 'Isaías'],
    correctAnswer: 2,
    category: 'characters',
    difficulty: 'medium',
    bibleReference: 'Jonas 1:17',
    explanation:
      'Jonas foi engolido por um grande peixe após tentar fugir da missão que Deus lhe deu.',
  },
  {
    id: '4',
    question: 'Qual é o primeiro mandamento?',
    options: [
      'Não matarás',
      'Amarás o Senhor teu Deus de todo o teu coração',
      'Honrarás pai e mãe',
      'Não furtarás',
    ],
    correctAnswer: 1,
    category: 'teachings',
    difficulty: 'medium',
    bibleReference: 'Êxodo 20:3',
    explanation: 'O primeiro mandamento é amar a Deus acima de todas as coisas.',
  },
  {
    id: '5',
    question: 'Quem construiu a arca de Noé?',
    options: ['Moisés', 'Noé', 'Abraão', 'José'],
    correctAnswer: 1,
    category: 'old-testament',
    difficulty: 'easy',
    bibleReference: 'Gênesis 6:14-16',
    explanation: 'Noé construiu a arca seguindo as instruções detalhadas de Deus.',
  },
];

// Add more questions following the same pattern...
