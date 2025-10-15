import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Quiz } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, Lock } from 'lucide-react';

interface QuizOverlayProps {
  quiz: Quiz;
  onCorrect: () => void;
  onIncorrect: () => void;
  onLocked: () => void;
  attempts: number;
}

const QuizOverlay = ({ quiz, onCorrect, onIncorrect, onLocked, attempts }: QuizOverlayProps) => {
  const { t } = useLanguage();
  const [answer, setAnswer] = useState<string | string[]>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const remainingAttempts = quiz.maxAttempts - attempts;

  if (remainingAttempts <= 0) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Lock className="h-5 w-5" />
              {t('quiz.locked')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You have exceeded the maximum number of attempts for this quiz. Please request an admin to unlock it.
            </p>
            <Button className="w-full" onClick={onLocked}>
              {t('quiz.requestUnlock')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = () => {
    let correct = false;

    if (quiz.type === 'multiple-choice' || quiz.type === 'true-false') {
      correct = answer === quiz.correctAnswer;
    } else if (quiz.type === 'checkbox') {
      const correctAnswers = quiz.correctAnswer as string[];
      correct = selectedOptions.length === correctAnswers.length &&
        selectedOptions.every(opt => correctAnswers.includes(opt));
    } else if (quiz.type === 'fill-blank') {
      correct = answer.toString().toLowerCase().trim() === (quiz.correctAnswer as string).toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onCorrect();
      }, 1500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        onIncorrect();
      }, 2000);
    }
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    setSelectedOptions(prev =>
      checked ? [...prev, option] : prev.filter(o => o !== option)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">{quiz.question}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Attempts remaining: {remainingAttempts}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz.type === 'multiple-choice' && (
            <RadioGroup value={answer as string} onValueChange={setAnswer}>
              {quiz.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {quiz.type === 'checkbox' && (
            <div className="space-y-2">
              {quiz.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                  />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {quiz.type === 'true-false' && (
            <RadioGroup value={answer as string} onValueChange={setAnswer}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          )}

          {quiz.type === 'fill-blank' && (
            <Input
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          {showFeedback && (
            <div className={`p-3 rounded-lg ${isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              <div className="flex items-center gap-2">
                {!isCorrect && <AlertCircle className="h-4 w-4" />}
                <span className="font-medium">
                  {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                </span>
              </div>
            </div>
          )}

          {!showFeedback && (
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={
                (quiz.type === 'checkbox' && selectedOptions.length === 0) ||
                (quiz.type !== 'checkbox' && !answer)
              }
            >
              {t('quiz.submit')}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizOverlay;
