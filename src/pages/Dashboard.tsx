import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
  
  const completedCourses = user?.completedCourses.length || 0;
  const inProgressCourses = mockCourses.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-2xl font-bold mb-1">{t('dashboard.welcome')}</h1>
        <p className="text-primary-foreground/90">{user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground text-center mb-1">{t('dashboard.studyHours')}</p>
              <p className="text-2xl font-bold text-primary text-center">{user?.studyHours || 0}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground text-center mb-1">{t('dashboard.completed') || 'Completed'}</p>
              <p className="text-2xl font-bold text-success text-center">{completedCourses}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg">
            <CardContent className="p-4">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-5 w-5 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground text-center mb-1">{t('dashboard.inProgress') || 'In Progress'}</p>
              <p className="text-2xl font-bold text-warning text-center">{inProgressCourses}</p>
            </CardContent>
          </Card>
        </div>
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
