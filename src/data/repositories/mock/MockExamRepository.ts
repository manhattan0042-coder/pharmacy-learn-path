import { IExamRepository } from '../IExamRepository';
import { Exam, ExamResult, ExamAnswer } from '../../models/Exam';
import { mockExams } from '@/lib/mockData';

export class MockExamRepository extends IExamRepository {
  private static RESULTS_KEY = 'pharmacy_exam_results';

  async getAllExams(): Promise<Exam[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockExams;
  }

  async getExamById(id: string): Promise<Exam | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockExams.find(e => e.id === id) || null;
  }

  async submitExam(examId: string, answers: ExamAnswer[]): Promise<ExamResult> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const exam = await this.getExamById(examId);
    if (!exam) throw new Error('Exam not found');

    let correctAnswers = 0;
    
    answers.forEach(answer => {
      const question = exam.questions.find(q => q.id === answer.questionId);
      if (!question) return;

      if (question.type === 'checkbox') {
        const userAnswers = Array.isArray(answer.answer) ? answer.answer.sort() : [];
        const correctAnswer = Array.isArray(question.correctAnswer) 
          ? question.correctAnswer.sort() 
          : [];
        
        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswer)) {
          correctAnswers++;
        }
      } else {
        if (answer.answer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    const score = Math.round((correctAnswers / exam.totalQuestions) * 100);
    const passed = score >= exam.passingScore;

    const result: ExamResult = {
      examId,
      score,
      totalQuestions: exam.totalQuestions,
      correctAnswers,
      passed,
      answers,
      completedAt: new Date()
    };

    // Store result
    const results = this.getStoredResults();
    results[examId] = result;
    localStorage.setItem(MockExamRepository.RESULTS_KEY, JSON.stringify(results));

    return result;
  }

  async getExamResult(examId: string): Promise<ExamResult | null> {
    const results = this.getStoredResults();
    return results[examId] || null;
  }

  private getStoredResults(): Record<string, ExamResult> {
    const stored = localStorage.getItem(MockExamRepository.RESULTS_KEY);
    return stored ? JSON.parse(stored) : {};
  }
}
