import { IUserRepository } from '../IUserRepository';
import { User, StudyHoursStats, StudyHoursData } from '../../models/User';

export class MockUserRepository extends IUserRepository {
  private static STORAGE_KEY = 'pharmacy_user';

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem(MockUserRepository.STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  async login(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      id: '1',
      name: 'John Doe',
      email,
      studyHours: 42,
      completedCourses: [],
      certificates: []
    };
    
    localStorage.setItem(MockUserRepository.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      studyHours: 0,
      completedCourses: [],
      certificates: []
    };
    
    localStorage.setItem(MockUserRepository.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(MockUserRepository.STORAGE_KEY);
  }

  async updateStudyHours(hours: number): Promise<void> {
    const user = await this.getCurrentUser();
    if (user) {
      user.studyHours = hours;
      localStorage.setItem(MockUserRepository.STORAGE_KEY, JSON.stringify(user));
    }
  }

  async completeCourse(courseId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (user && !user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
      user.certificates.push(`Certificate for ${courseId}`);
      localStorage.setItem(MockUserRepository.STORAGE_KEY, JSON.stringify(user));
    }
  }

  async getStudyHoursStats(): Promise<StudyHoursStats> {
    // Generate mock weekly data (last 7 days)
    const weekly: StudyHoursData[] = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekly.push({
        date: date.toISOString().split('T')[0],
        hours: Math.floor(Math.random() * 8) + 1,
        label: days[date.getDay()]
      });
    }

    // Generate mock monthly data (last 12 months)
    const monthly: StudyHoursData[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      monthly.push({
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        hours: Math.floor(Math.random() * 100) + 20,
        label: months[date.getMonth()]
      });
    }

    const thisWeek = weekly.reduce((sum, day) => sum + day.hours, 0);
    const thisMonth = monthly[monthly.length - 1].hours;
    const total = monthly.reduce((sum, month) => sum + month.hours, 0);

    return {
      daily: weekly,
      weekly,
      monthly,
      total,
      thisWeek,
      thisMonth
    };
  }
}
