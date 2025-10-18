import { IUserRepository } from './IUserRepository';
import { ICourseRepository } from './ICourseRepository';
import { IExamRepository } from './IExamRepository';
import { ILeaderboardRepository } from './ILeaderboardRepository';
import { MockUserRepository } from './mock/MockUserRepository';
import { MockCourseRepository } from './mock/MockCourseRepository';
import { MockExamRepository } from './mock/MockExamRepository';
import { MockLeaderboardRepository } from './mock/MockLeaderboardRepository';

type RepositoryMode = 'mock' | 'api';

class RepositoryFactory {
  private mode: RepositoryMode = 'mock'; // Change to 'api' when backend is ready

  setMode(mode: RepositoryMode) {
    this.mode = mode;
  }

  getUserRepository(): IUserRepository {
    if (this.mode === 'mock') {
      return new MockUserRepository();
    }
    // Future: return new ApiUserRepository();
    throw new Error('API repository not implemented yet');
  }

  getCourseRepository(): ICourseRepository {
    if (this.mode === 'mock') {
      return new MockCourseRepository();
    }
    // Future: return new ApiCourseRepository();
    throw new Error('API repository not implemented yet');
  }

  getExamRepository(): IExamRepository {
    if (this.mode === 'mock') {
      return new MockExamRepository();
    }
    // Future: return new ApiExamRepository();
    throw new Error('API repository not implemented yet');
  }

  getLeaderboardRepository(): ILeaderboardRepository {
    if (this.mode === 'mock') {
      return new MockLeaderboardRepository();
    }
    // Future: return new ApiLeaderboardRepository();
    throw new Error('API repository not implemented yet');
  }
}

export const repositoryFactory = new RepositoryFactory();
