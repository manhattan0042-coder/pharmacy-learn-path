import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'km';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'Our Pharmacy',
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.exams': 'Exams',
    'nav.leaderboard': 'Leaderboard',
    'nav.profile': 'Profile',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.logout': 'Logout',
    'dashboard.welcome': 'Welcome back',
    'dashboard.studyHours': 'Study Hours This Month',
    'dashboard.progressingCourses': 'Continue Learning',
    'dashboard.assignedCourses': 'Assigned Courses',
    'dashboard.publicCourses': 'Public Courses',
    'course.start': 'Start Course',
    'course.continue': 'Continue',
    'course.chapters': 'Chapters',
    'course.lessons': 'Lessons',
    'course.completed': 'Completed',
    'leaderboard.title': 'Top Learners',
    'leaderboard.thisMonth': 'This Month',
    'profile.title': 'Profile',
    'profile.settings': 'Settings',
    'profile.history': 'Course History',
    'profile.certificates': 'Certificates',
    'profile.theme': 'Dark Mode',
    'profile.language': 'Language',
    'quiz.submit': 'Submit Answer',
    'quiz.next': 'Next',
    'quiz.correct': 'Correct!',
    'quiz.incorrect': 'Incorrect. Try again.',
    'quiz.locked': 'Quiz Locked',
    'quiz.requestUnlock': 'Request Unlock',
    'exam.title': 'Exams',
    'exam.assigned': 'Assigned Exams',
    'exam.completed': 'Completed Exams',
    'exam.start': 'Start Exam',
    'exam.view': 'View Results',
    'exam.duration': 'Duration',
    'exam.questions': 'Questions',
    'exam.passingScore': 'Passing Score',
  },
  km: {
    'app.name': 'ឱសថស្ថានរបស់យើង',
    'nav.home': 'ទំព័រដើម',
    'nav.courses': 'វគ្គសិក្សា',
    'nav.exams': 'ប្រឡង',
    'nav.leaderboard': 'ចំណាត់ថ្នាក់',
    'nav.profile': 'ប្រវត្តិរូប',
    'auth.login': 'ចូល',
    'auth.register': 'ចុះឈ្មោះ',
    'auth.email': 'អ៊ីមែល',
    'auth.password': 'ពាក្យសម្ងាត់',
    'auth.name': 'ឈ្មោះពេញ',
    'auth.logout': 'ចាកចេញ',
    'dashboard.welcome': 'សូមស្វាគមន៍',
    'dashboard.studyHours': 'ម៉ោងសិក្សាខែនេះ',
    'dashboard.progressingCourses': 'បន្តសិក្សា',
    'dashboard.assignedCourses': 'វគ្គសិក្សាបានចាត់តាំង',
    'dashboard.publicCourses': 'វគ្គសិក្សាសាធារណៈ',
    'course.start': 'ចាប់ផ្តើមវគ្គសិក្សា',
    'course.continue': 'បន្ត',
    'course.chapters': 'ជំពូក',
    'course.lessons': 'មេរៀន',
    'course.completed': 'បានបញ្ចប់',
    'leaderboard.title': 'អ្នកសិក្សាល្អបំផុត',
    'leaderboard.thisMonth': 'ខែនេះ',
    'profile.title': 'ប្រវត្តិរូប',
    'profile.settings': 'ការកំណត់',
    'profile.history': 'ប្រវត្តិវគ្គសិក្សា',
    'profile.certificates': 'វិញ្ញាបនប័ត្រ',
    'profile.theme': 'របៀបងងឹត',
    'profile.language': 'ភាសា',
    'quiz.submit': 'ដាក់ចម្លើយ',
    'quiz.next': 'បន្ទាប់',
    'quiz.correct': 'ត្រឹមត្រូវ!',
    'quiz.incorrect': 'មិនត្រឹមត្រូវ។ សាកល្បងម្តងទៀត។',
    'quiz.locked': 'តេស្តជាប់សោ',
    'quiz.requestUnlock': 'ស្នើសុំដោះសោ',
    'exam.title': 'ប្រឡង',
    'exam.assigned': 'ប្រឡងបានចាត់តាំង',
    'exam.completed': 'ប្រឡងបានបញ្ចប់',
    'exam.start': 'ចាប់ផ្តើមប្រឡង',
    'exam.view': 'មើលលទ្ធផល',
    'exam.duration': 'រយៈពេល',
    'exam.questions': 'សំណួរ',
    'exam.passingScore': 'ពិន្ទុជាប់',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'km' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
