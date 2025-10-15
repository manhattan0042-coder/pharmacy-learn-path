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
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-gradient-card">
      <div className="h-24 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{course.chapters.length} {t('course.chapters')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.estimatedHours}h</span>
          </div>
        </div>
        {course.progress > 0 && (
          <div className="space-y-1">
            <Progress value={course.progress} className="h-1.5" />
            <p className="text-xs text-muted-foreground text-right">{course.progress}%</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Link to={`/course/${course.id}`} className="w-full">
          <Button size="sm" className="w-full h-8 text-xs" variant={course.progress > 0 ? 'outline' : 'default'}>
            {course.progress > 0 ? t('course.continue') : t('course.start')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
