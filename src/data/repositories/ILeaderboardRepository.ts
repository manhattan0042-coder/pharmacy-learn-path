import { LeaderboardEntry } from '../models/Leaderboard';

export abstract class ILeaderboardRepository {
  abstract getLeaderboard(): Promise<LeaderboardEntry[]>;
  abstract getTopFive(): Promise<LeaderboardEntry[]>;
}
