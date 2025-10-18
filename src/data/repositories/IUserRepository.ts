import { User, StudyHoursStats } from '../models/User';

export abstract class IUserRepository {
  abstract getCurrentUser(): Promise<User | null>;
  abstract login(email: string, password: string): Promise<User>;
  abstract register(name: string, email: string, password: string): Promise<User>;
  abstract logout(): Promise<void>;
  abstract updateStudyHours(hours: number): Promise<void>;
  abstract completeCourse(courseId: string): Promise<void>;
  abstract getStudyHoursStats(): Promise<StudyHoursStats>;
}
