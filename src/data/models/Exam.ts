export type QuestionType = 'multiple-choice' | 'true-false' | 'checkbox' | 'fill-blank';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  type: 'multiple-choice' | 'checkbox' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  maxAttempts: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  questions: Quiz[];
  completed: boolean;
  score?: number;
  assignedDate: string;
}

export interface ExamAnswer {
  questionId: string;
  answer: string | string[];
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  answers: ExamAnswer[];
  completedAt: Date;
}
