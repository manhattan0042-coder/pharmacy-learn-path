import { ICourseRepository } from '../ICourseRepository';
import { Course } from '../../models/Course';
import { mockCourses } from '@/lib/mockData';

export class MockCourseRepository extends ICourseRepository {
  async getAllCourses(): Promise<Course[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses;
  }

  async getCourseById(id: string): Promise<Course | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.find(c => c.id === id) || null;
  }

  async getProgressingCourses(): Promise<Course[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.filter(c => c.progress > 0 && c.progress < 100);
  }

  async getAssignedCourses(): Promise<Course[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.filter(c => c.type === 'assigned');
  }

  async getPublicCourses(): Promise<Course[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.filter(c => c.type === 'public');
  }
}
