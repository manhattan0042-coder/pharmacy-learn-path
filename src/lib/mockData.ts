export interface Quiz {
  id: string;
  type: 'multiple-choice' | 'checkbox' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  timestamp?: number;
  maxAttempts: number;
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

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  endQuiz: Quiz[];
  completed: boolean;
}

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

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Pharmaceutical Basics',
    description: 'Essential knowledge for pharmacy interns',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    type: 'assigned',
    progress: 0,
    estimatedHours: 12,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Introduction to Pharmacy',
        completed: false,
        lessons: [
          {
            id: 'lesson-1',
            title: 'What is Pharmacy?',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Pharmacy is the science and practice of discovering, producing, preparing, dispensing, reviewing and monitoring medications.',
            attachments: [
              { name: 'Pharmacy Introduction.pdf', url: '#' },
              { name: 'Study Guide.docx', url: '#' },
            ],
            popupQuizzes: [
              {
                id: 'popup-1',
                type: 'multiple-choice',
                question: 'What is the primary role of a pharmacist?',
                options: ['Selling medications', 'Dispensing and reviewing medications', 'Manufacturing drugs', 'All of the above'],
                correctAnswer: 'Dispensing and reviewing medications',
                timestamp: 30,
                maxAttempts: 3,
              },
            ],
            endQuiz: [
              {
                id: 'end-1',
                type: 'checkbox',
                question: 'Select all responsibilities of a pharmacist:',
                options: ['Dispense medications', 'Provide patient counseling', 'Perform surgeries', 'Monitor drug interactions'],
                correctAnswer: ['Dispense medications', 'Provide patient counseling', 'Monitor drug interactions'],
                maxAttempts: 3,
              },
            ],
            completed: false,
          },
          {
            id: 'lesson-2',
            title: 'Pharmacy Ethics',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Understanding professional ethics and responsibilities in pharmaceutical practice.',
            attachments: [
              { name: 'Ethics Guidelines.pdf', url: '#' },
            ],
            popupQuizzes: [
              {
                id: 'popup-2',
                type: 'true-false',
                question: 'Patient confidentiality is a core ethical principle in pharmacy.',
                correctAnswer: 'true',
                timestamp: 45,
                maxAttempts: 2,
              },
            ],
            endQuiz: [
              {
                id: 'end-2',
                type: 'fill-blank',
                question: 'The primary ethical principle that requires pharmacists to maintain patient information private is called ___.',
                correctAnswer: 'confidentiality',
                maxAttempts: 3,
              },
            ],
            completed: false,
          },
        ],
        endQuiz: [
          {
            id: 'chapter-end-1',
            type: 'multiple-choice',
            question: 'Which statement best describes the pharmacy profession?',
            options: [
              'Only about selling medications',
              'A healthcare profession focused on safe medication use',
              'Only about manufacturing drugs',
              'None of the above',
            ],
            correctAnswer: 'A healthcare profession focused on safe medication use',
            maxAttempts: 3,
          },
        ],
      },
      {
        id: 'chapter-2',
        title: 'Medication Safety',
        completed: false,
        lessons: [
          {
            id: 'lesson-3',
            title: 'Drug Interactions',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Understanding how different medications interact with each other.',
            attachments: [
              { name: 'Drug Interaction Chart.pdf', url: '#' },
            ],
            popupQuizzes: [
              {
                id: 'popup-3',
                type: 'multiple-choice',
                question: 'What is a drug-drug interaction?',
                options: [
                  'When two drugs affect each other',
                  'When a drug affects food',
                  'When a drug causes allergies',
                  'None of these',
                ],
                correctAnswer: 'When two drugs affect each other',
                timestamp: 60,
                maxAttempts: 3,
              },
            ],
            endQuiz: [
              {
                id: 'end-3',
                type: 'checkbox',
                question: 'Select all factors that can cause drug interactions:',
                options: ['Other medications', 'Food and beverages', 'Patient age', 'Time of day only'],
                correctAnswer: ['Other medications', 'Food and beverages', 'Patient age'],
                maxAttempts: 3,
              },
            ],
            completed: false,
          },
        ],
        endQuiz: [
          {
            id: 'chapter-end-2',
            type: 'true-false',
            question: 'Monitoring for drug interactions is an important part of pharmaceutical care.',
            correctAnswer: 'true',
            maxAttempts: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Clinical Pharmacy Practice',
    description: 'Advanced clinical pharmacy skills',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    type: 'assigned',
    progress: 0,
    estimatedHours: 20,
    chapters: [
      {
        id: 'chapter-3',
        title: 'Patient Counseling',
        completed: false,
        lessons: [
          {
            id: 'lesson-4',
            title: 'Effective Communication',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Learn how to communicate effectively with patients about their medications.',
            attachments: [
              { name: 'Communication Skills.pdf', url: '#' },
            ],
            popupQuizzes: [],
            endQuiz: [
              {
                id: 'end-4',
                type: 'multiple-choice',
                question: 'What is the most important aspect of patient counseling?',
                options: ['Speaking quickly', 'Active listening', 'Using medical jargon', 'Avoiding eye contact'],
                correctAnswer: 'Active listening',
                maxAttempts: 3,
              },
            ],
            completed: false,
          },
        ],
        endQuiz: [],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Pharmaceutical Calculations',
    description: 'Master pharmaceutical math and dosage calculations',
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400',
    type: 'public',
    progress: 0,
    estimatedHours: 15,
    chapters: [
      {
        id: 'chapter-4',
        title: 'Basic Calculations',
        completed: false,
        lessons: [
          {
            id: 'lesson-5',
            title: 'Dosage Calculations',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Learn to calculate proper medication dosages.',
            attachments: [],
            popupQuizzes: [],
            endQuiz: [],
            completed: false,
          },
        ],
        endQuiz: [],
      },
    ],
  },
  {
    id: 'course-4',
    title: 'Pharmacy Management',
    description: 'Business and management skills for pharmacy',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    type: 'public',
    progress: 0,
    estimatedHours: 10,
    chapters: [],
  },
];

export interface LeaderboardEntry {
  id: string;
  name: string;
  studyHours: number;
  coursesCompleted: number;
  rank: number;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Sophea Chan', studyHours: 45, coursesCompleted: 5, rank: 1 },
  { id: '2', name: 'Dara Sok', studyHours: 38, coursesCompleted: 4, rank: 2 },
  { id: '3', name: 'Makara Lim', studyHours: 35, coursesCompleted: 4, rank: 3 },
  { id: '4', name: 'Vanna Keo', studyHours: 28, coursesCompleted: 3, rank: 4 },
  { id: '5', name: 'Bopha Meas', studyHours: 22, coursesCompleted: 3, rank: 5 },
];

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number; // percentage
  questions: Quiz[];
  completed: boolean;
  score?: number;
  assignedDate: string;
}

export const mockExams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Pharmacy Fundamentals Assessment',
    description: 'Comprehensive exam covering basic pharmacy knowledge',
    duration: 60,
    totalQuestions: 20,
    passingScore: 70,
    completed: false,
    assignedDate: '2024-01-15',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is the primary role of a pharmacist?',
        options: ['Selling medications', 'Dispensing and reviewing medications', 'Manufacturing drugs', 'All of the above'],
        correctAnswer: 'Dispensing and reviewing medications',
        maxAttempts: 1,
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'Patient confidentiality is optional in pharmacy practice.',
        correctAnswer: 'false',
        maxAttempts: 1,
      },
      {
        id: 'q3',
        type: 'checkbox',
        question: 'Which of the following are responsibilities of a pharmacist?',
        options: ['Dispense medications', 'Perform surgery', 'Counsel patients', 'Monitor drug interactions'],
        correctAnswer: ['Dispense medications', 'Counsel patients', 'Monitor drug interactions'],
        maxAttempts: 1,
      },
      {
        id: 'q4',
        type: 'fill-blank',
        question: 'The practice of preparing and dispensing medications is called ___.',
        correctAnswer: 'pharmacy',
        maxAttempts: 1,
      },
    ],
  },
  {
    id: 'exam-2',
    title: 'Clinical Pharmacy Practice Exam',
    description: 'Test your clinical pharmacy skills and knowledge',
    duration: 90,
    totalQuestions: 30,
    passingScore: 75,
    completed: false,
    assignedDate: '2024-01-20',
    questions: [],
  },
  {
    id: 'exam-3',
    title: 'Medication Safety Certification',
    description: 'Certification exam for medication safety protocols',
    duration: 45,
    totalQuestions: 15,
    passingScore: 80,
    completed: true,
    score: 87,
    assignedDate: '2024-01-10',
    questions: [],
  },
];
