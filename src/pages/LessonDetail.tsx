import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizOverlay from '@/components/QuizOverlay';
import { mockCourses } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const LessonDetail = () => {
  const { courseId, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState<Record<string, number>>({});
  const [completedPopupQuizzes, setCompletedPopupQuizzes] = useState<Set<string>>(new Set());
  const [showEndQuiz, setShowEndQuiz] = useState(false);
  const [endQuizAttempts, setEndQuizAttempts] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const timeCheckInterval = useRef<NodeJS.Timeout>();

  const course = mockCourses.find(c => c.id === courseId);
  const chapter = course?.chapters.find(ch => ch.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (isPlaying) {
      timeCheckInterval.current = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timeCheckInterval.current) {
        clearInterval(timeCheckInterval.current);
      }
    }

    return () => {
      if (timeCheckInterval.current) {
        clearInterval(timeCheckInterval.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (lesson?.popupQuizzes && isPlaying) {
      lesson.popupQuizzes.forEach((quiz, index) => {
        if (quiz.timestamp && currentTime >= quiz.timestamp && !completedPopupQuizzes.has(quiz.id)) {
          setIsPlaying(false);
          setShowQuiz(true);
          setCurrentQuizIndex(index);
        }
      });
    }
  }, [currentTime, lesson, isPlaying, completedPopupQuizzes]);

  if (!course || !chapter || !lesson) {
    return <div>Lesson not found</div>;
  }

  const handleQuizCorrect = () => {
    if (lesson.popupQuizzes[currentQuizIndex]) {
      setCompletedPopupQuizzes(prev => new Set([...prev, lesson.popupQuizzes[currentQuizIndex].id]));
    }
    setShowQuiz(false);
    setIsPlaying(true);
  };

  const handleQuizIncorrect = () => {
    const quiz = lesson.popupQuizzes[currentQuizIndex];
    const attempts = (quizAttempts[quiz.id] || 0) + 1;
    setQuizAttempts(prev => ({ ...prev, [quiz.id]: attempts }));

    if (attempts >= quiz.maxAttempts) {
      setShowQuiz(false);
      toast.error('Maximum attempts reached. Video segment will restart.');
      const previousQuiz = lesson.popupQuizzes[currentQuizIndex - 1];
      setCurrentTime(previousQuiz?.timestamp || 0);
    }
  };

  const handleQuizLocked = () => {
    setShowQuiz(false);
    toast.info('Unlock request sent to admin');
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (lesson.endQuiz.length > 0) {
      setShowEndQuiz(true);
    }
  };

  const handleEndQuizCorrect = () => {
    setShowEndQuiz(false);
    toast.success('Lesson completed!');
    
    // Find next lesson
    const currentLessonIndex = chapter.lessons.findIndex(l => l.id === lessonId);
    if (currentLessonIndex < chapter.lessons.length - 1) {
      const nextLesson = chapter.lessons[currentLessonIndex + 1];
      navigate(`/course/${courseId}/chapter/${chapterId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const handleEndQuizIncorrect = () => {
    const attempts = endQuizAttempts + 1;
    setEndQuizAttempts(attempts);

    if (lesson.endQuiz[0] && attempts >= lesson.endQuiz[0].maxAttempts) {
      setShowEndQuiz(false);
      toast.error('Maximum attempts reached for end quiz');
    }
  };

  return (
    <div className="min-h-screen pb-6 bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <Link to={`/course/${courseId}`}>
          <Button variant="ghost" size="sm" className="text-primary-foreground mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-primary-foreground/90 mt-1">
          {chapter.title}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Video Player */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-black">
            <iframe
              ref={videoRef}
              className="w-full h-full"
              src={`${lesson.videoUrl}?autoplay=${isPlaying ? 1 : 0}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Progress: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (currentTime > 0 && !isPlaying) {
                    // Simulate video end for demo
                    if (currentTime > 120) {
                      handleVideoEnd();
                    }
                  }
                }}
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-3"
              onClick={handleVideoEnd}
            >
              Complete Lesson (Demo)
            </Button>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <Card>
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{lesson.content}</p>
          </CardContent>
        </Card>

        {/* Attachments */}
        {lesson.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lesson.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <span className="text-sm font-medium">{attachment.name}</span>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Popup Quiz Overlay */}
      {showQuiz && lesson.popupQuizzes[currentQuizIndex] && (
        <QuizOverlay
          quiz={lesson.popupQuizzes[currentQuizIndex]}
          onCorrect={handleQuizCorrect}
          onIncorrect={handleQuizIncorrect}
          onLocked={handleQuizLocked}
          attempts={quizAttempts[lesson.popupQuizzes[currentQuizIndex].id] || 0}
        />
      )}

      {/* End of Lesson Quiz */}
      {showEndQuiz && lesson.endQuiz[0] && (
        <QuizOverlay
          quiz={lesson.endQuiz[0]}
          onCorrect={handleEndQuizCorrect}
          onIncorrect={handleEndQuizIncorrect}
          onLocked={() => {
            setShowEndQuiz(false);
            toast.info('Unlock request sent to admin');
          }}
          attempts={endQuizAttempts}
        />
      )}
    </div>
  );
};

export default LessonDetail;
