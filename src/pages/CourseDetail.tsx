import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockCourses } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen pb-6 bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <Link to="/courses">
          <Button variant="ghost" size="sm" className="text-primary-foreground mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-primary-foreground/90 mt-2">{course.description}</p>
      </div>

      <div className="p-4">
        {course.progress > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {course.chapters.map((chapter, index) => (
            <Card key={chapter.id} className="overflow-hidden">
              <CardHeader className="bg-secondary/50">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>
                    {index + 1}. {chapter.title}
                  </span>
                  {chapter.completed && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const isLocked = lessonIndex > 0 && !chapter.lessons[lessonIndex - 1].completed;
                    
                    return (
                      <div key={lesson.id}>
                        {isLocked ? (
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{lesson.title}</span>
                            </div>
                          </div>
                        ) : (
                          <Link to={`/course/${courseId}/chapter/${chapter.id}/lesson/${lesson.id}`}>
                            <div className="flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors">
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                )}
                                <span className="text-sm font-medium">{lesson.title}</span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
