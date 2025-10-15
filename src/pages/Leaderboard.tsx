import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockLeaderboard } from '@/lib/mockData';

const Leaderboard = () => {
  const { t } = useLanguage();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-warning" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t('leaderboard.title')}</h1>
        <p className="text-primary-foreground/90">{t('leaderboard.thisMonth')}</p>
      </div>

      <div className="p-4 space-y-3">
        {mockLeaderboard.map((entry) => (
          <Card key={entry.id} className={entry.rank <= 3 ? 'bg-gradient-card shadow-md' : ''}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{entry.name}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{entry.studyHours}h studied</span>
                  <span>{entry.coursesCompleted} courses</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
