import { ILeaderboardRepository } from '../ILeaderboardRepository';
import { LeaderboardEntry } from '../../models/Leaderboard';
import { mockLeaderboard } from '@/lib/mockData';

export class MockLeaderboardRepository extends ILeaderboardRepository {
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeaderboard;
  }

  async getTopFive(): Promise<LeaderboardEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeaderboard.slice(0, 5);
  }
}
