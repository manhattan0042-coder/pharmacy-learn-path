import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-card">
      <div className="h-32 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.chapters.length} {t('course.chapters')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.estimatedHours}h</span>
          </div>
        </div>
        {course.progress > 0 && (
          <div className="space-y-1">
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">{course.progress}% {t('course.completed')}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/course/${course.id}`} className="w-full">
          <Button className="w-full" variant={course.progress > 0 ? 'outline' : 'default'}>
            {course.progress > 0 ? t('course.continue') : t('course.start')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
