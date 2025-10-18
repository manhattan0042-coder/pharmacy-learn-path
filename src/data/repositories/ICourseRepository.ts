import { Course } from '../models/Course';

export abstract class ICourseRepository {
  abstract getAllCourses(): Promise<Course[]>;
  abstract getCourseById(id: string): Promise<Course | null>;
  abstract getProgressingCourses(): Promise<Course[]>;
  abstract getAssignedCourses(): Promise<Course[]>;
  abstract getPublicCourses(): Promise<Course[]>;
}
