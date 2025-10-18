export interface User {
  id: string;
  name: string;
  email: string;
  studyHours: number;
  completedCourses: string[];
  certificates: string[];
}

export interface StudyHoursData {
  date: string;
  hours: number;
  label: string;
}

export interface StudyHoursStats {
  daily: StudyHoursData[];
  weekly: StudyHoursData[];
  monthly: StudyHoursData[];
  total: number;
  thisWeek: number;
  thisMonth: number;
}
