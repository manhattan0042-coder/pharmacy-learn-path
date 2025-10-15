import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseCard from '@/components/CourseCard';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockCourses } from '@/lib/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const assignedCourses = mockCourses.filter(c => c.type === 'assigned');
  const publicCourses = mockCourses.filter(c => c.type === 'public');

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

      {/* Assigned Courses */}
      <section className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.assignedCourses')}</h2>
        <div className="grid gap-4">
          {assignedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Public Courses */}
      <section className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.publicCourses')}</h2>
        <div className="grid gap-4">
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
