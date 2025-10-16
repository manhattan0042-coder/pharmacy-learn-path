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
      <div className="flex gap-3 p-3">
        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-1 mb-0.5">{course.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{course.description}</p>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.chapters.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.estimatedHours}h</span>
            </div>
          </div>
          
          {course.progress > 0 && (
            <div className="space-y-1 mb-2">
              <Progress value={course.progress} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{course.progress}%</p>
            </div>
          )}
          
          <Link to={`/course/${course.id}`} className="mt-auto">
            <Button size="sm" className="w-full h-7 text-xs" variant={course.progress > 0 ? 'outline' : 'default'}>
              {course.progress > 0 ? t('course.continue') : t('course.start')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
