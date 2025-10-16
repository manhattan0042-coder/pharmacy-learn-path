import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockExams } from '@/lib/mockData';

const ExamResult = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const exam = mockExams.find(e => e.id === examId);
  const results = JSON.parse(localStorage.getItem('examResults') || '{}');
  const examResult = results[examId!];

  if (!exam || !examResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">No results found</p>
          <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
        </div>
      </div>
    );
  }

  const { score, answers } = examResult;
  const passed = score >= exam.passingScore;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/exams')}
          className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
        <h1 className="text-2xl font-bold">{exam.title}</h1>
      </div>

      <div className="px-4 -mt-4 max-w-lg mx-auto">
        {/* Score Card */}
        <Card className="mb-6 bg-gradient-card overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              passed ? 'bg-success/20' : 'bg-destructive/20'
            }`}>
              {passed ? (
                <Trophy className="h-10 w-10 text-success" />
              ) : (
                <XCircle className="h-10 w-10 text-destructive" />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">{score}%</h2>
            <Badge variant={passed ? 'default' : 'destructive'} className="mb-4">
              {passed ? 'Passed' : 'Failed'}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Passing score: {exam.passingScore}%
            </p>
          </CardContent>
        </Card>

        {/* Question Review */}
        <h2 className="text-lg font-bold mb-4">Answer Review</h2>
        <div className="space-y-4">
          {exam.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            let isCorrect = false;

            if (question.type === 'checkbox') {
              const correct = question.correctAnswer as string[];
              const user = userAnswer as string[];
              isCorrect = user && correct.length === user.length && correct.every(a => user.includes(a));
            } else if (question.type === 'fill-blank') {
              isCorrect = typeof userAnswer === 'string' && 
                userAnswer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase();
            } else {
              isCorrect = userAnswer === question.correctAnswer;
            }

            return (
              <Card key={question.id} className="bg-gradient-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <CardTitle className="text-sm flex-1">
                      Q{index + 1}. {question.question}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Your Answer:</p>
                    <p className="text-sm">
                      {question.type === 'checkbox' 
                        ? (userAnswer as string[] || []).join(', ') || 'Not answered'
                        : userAnswer || 'Not answered'
                      }
                    </p>
                  </div>
                  {!isCorrect && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Correct Answer:</p>
                      <p className="text-sm text-success">
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(', ')
                          : question.correctAnswer
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button onClick={() => navigate('/exams')} className="w-full mt-6">
          Back to Exams
        </Button>
      </div>
    </div>
  );
};

export default ExamResult;
