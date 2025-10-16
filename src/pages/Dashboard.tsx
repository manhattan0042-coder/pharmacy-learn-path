import { Clock, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CourseCard from '@/components/CourseCard';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockCourses, mockLeaderboard } from '@/lib/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const progressingCourses = mockCourses.filter(c => c.progress > 0 && c.progress < 100);
  const assignedCourses = mockCourses.filter(c => c.type === 'assigned');
  const publicCourses = mockCourses.filter(c => c.type === 'public');
  const topFiveLeaders = mockLeaderboard.slice(0, 5);

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-2xl font-bold mb-1">{t('dashboard.welcome')}</h1>
        <p className="text-primary-foreground/90">{user?.name}</p>
      </div>

      {/* Study Hours Card */}
      <div className="px-4 -mt-4 mb-6">
        <Card className="bg-card shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">{t('dashboard.studyHours')}</p>
              <p className="text-3xl font-bold text-primary">{user?.studyHours || 0}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Leaderboard */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">{t('leaderboard.title')}</h2>
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="space-y-3">
              {topFiveLeaders.map((leader, index) => (
                <div key={leader.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-primary/70 text-primary-foreground' :
                    index === 2 ? 'bg-primary/50 text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {leader.rank}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.studyHours}h studied</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Progressing Courses */}
      {progressingCourses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 px-4">{t('dashboard.progressingCourses') || 'Continue Learning'}</h2>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {progressingCourses.map(course => (
              <div key={course.id} className="w-[280px] flex-shrink-0">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Assigned Courses */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 px-4">{t('dashboard.assignedCourses')}</h2>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {assignedCourses.map(course => (
            <div key={course.id} className="w-[280px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      {/* Public Courses */}
      <section className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">{t('dashboard.publicCourses')}</h2>
        <div className="space-y-3">
          {publicCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
