import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockExams, Quiz } from '@/lib/mockData';
import { toast } from 'sonner';

const ExamDetail = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const exam = mockExams.find(e => e.id === examId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    if (exam && examStarted) {
      setTimeRemaining(exam.duration * 60);
    }
  }, [exam, examStarted]);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Exam not found</p>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    toast.success('Exam started! Good luck!');
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    exam.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'checkbox') {
        const correct = question.correctAnswer as string[];
        const user = userAnswer as string[];
        if (user && correct.length === user.length && correct.every(a => user.includes(a))) {
          correctCount++;
        }
      } else if (question.type === 'fill-blank') {
        if (typeof userAnswer === 'string' && userAnswer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase()) {
          correctCount++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / exam.questions.length) * 100);
    
    // Save result to localStorage
    const results = JSON.parse(localStorage.getItem('examResults') || '{}');
    results[examId!] = {
      score,
      answers,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('examResults', JSON.stringify(results));

    // Update exam completion status
    exam.completed = true;
    exam.score = score;

    toast.success(`Exam completed! Your score: ${score}%`);
    navigate(`/exam/${examId}/result`);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/exams')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>{exam.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{exam.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">{exam.duration} minutes</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-semibold">{exam.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Passing Score</p>
                  <p className="font-semibold">{exam.passingScore}%</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Answer all questions within the time limit</li>
                  <li>You can navigate between questions</li>
                  <li>The exam will auto-submit when time runs out</li>
                  <li>You can only take this exam once</li>
                </ul>
              </div>

              <Button onClick={handleStartExam} className="w-full">
                Start Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Timer */}
      <div className="bg-gradient-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold">{exam.title}</h1>
            <div className="flex items-center gap-2 bg-primary-foreground/20 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs mt-1 text-primary-foreground/80">
            Question {currentQuestionIndex + 1} of {exam.questions.length}
          </p>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-4 max-w-lg mx-auto">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-base">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === 'multiple-choice' && (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ''}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === 'true-false' && (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ''}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                </div>
              </RadioGroup>
            )}

            {currentQuestion.type === 'checkbox' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option, index) => {
                  const isChecked = (answers[currentQuestion.id] as string[] || []).includes(option);
                  return (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                      <Checkbox
                        id={`checkbox-${index}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const current = (answers[currentQuestion.id] as string[]) || [];
                          if (checked) {
                            handleAnswer(currentQuestion.id, [...current, option]);
                          } else {
                            handleAnswer(currentQuestion.id, current.filter(a => a !== option));
                          }
                        }}
                      />
                      <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'fill-blank' && (
              <Input
                value={(answers[currentQuestion.id] as string) || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder="Type your answer here..."
                className="text-base"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1"
          >
            Previous
          </Button>
          
          {currentQuestionIndex < exam.questions.length - 1 ? (
            <Button onClick={handleNext} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmitExam} className="flex-1">
              Submit Exam
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
