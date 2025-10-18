export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chapters: Chapter[];
  type: 'assigned' | 'public';
  progress: number;
  estimatedHours: number;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  endQuiz: Quiz[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  attachments: { name: string; url: string }[];
  popupQuizzes: Quiz[];
  endQuiz: Quiz[];
  completed: boolean;
}

export interface Quiz {
  id: string;
  type: 'multiple-choice' | 'checkbox' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  timestamp?: number;
  maxAttempts: number;
}
