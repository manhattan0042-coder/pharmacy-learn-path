import { Clock, BookOpen, CheckCircle2, PlayCircle } from 'lucide-react';
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
  
  const enrolledCourses = mockCourses.length;
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
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card className="bg-card shadow-md">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">{t('dashboard.enrolled') || 'Enrolled'}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{enrolledCourses}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <p className="text-xs text-muted-foreground">{t('dashboard.completed') || 'Completed'}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{completedCourses}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card shadow-md">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                  <PlayCircle className="h-4 w-4 text-warning" />
                </div>
                <p className="text-xs text-muted-foreground">{t('dashboard.inProgress') || 'In Progress'}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{inProgressCourses}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-info" />
                </div>
                <p className="text-xs text-muted-foreground">{t('dashboard.studyHours') || 'Study Hours'}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{user?.studyHours || 0}</p>
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
