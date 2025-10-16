import { Clock, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockExams } from '@/lib/mockData';

const Exams = () => {
  const { t } = useLanguage();

  const assignedExams = mockExams.filter(exam => !exam.completed);
  const completedExams = mockExams.filter(exam => exam.completed);

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-2xl font-bold">{t('exam.title')}</h1>
      </div>

      {/* Assigned Exams */}
      <section className="px-4 -mt-4 mb-6">
        <h2 className="text-lg font-bold mb-3">{t('exam.assigned')}</h2>
        <div className="space-y-3">
          {assignedExams.map(exam => (
            <Card key={exam.id} className="overflow-hidden bg-gradient-card">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">{exam.title}</CardTitle>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {t('exam.assigned')}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{exam.description}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    <span>{exam.totalQuestions} {t('exam.questions')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{exam.passingScore}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  {t('exam.start')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Completed Exams */}
      {completedExams.length > 0 && (
        <section className="px-4 mb-6">
          <h2 className="text-lg font-bold mb-3">{t('exam.completed')}</h2>
          <div className="space-y-3">
            {completedExams.map(exam => (
              <Card key={exam.id} className="overflow-hidden bg-gradient-card">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">{exam.title}</CardTitle>
                    <Badge variant="default" className="flex-shrink-0 bg-success">
                      {exam.score}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{exam.description}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{exam.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>{exam.totalQuestions} {t('exam.questions')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{t('course.completed')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant="outline" size="sm">
                    {t('exam.view')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
};

export default Exams;
