import { Exam, ExamResult } from '../models/Exam';

export abstract class IExamRepository {
  abstract getAllExams(): Promise<Exam[]>;
  abstract getExamById(id: string): Promise<Exam | null>;
  abstract submitExam(examId: string, answers: any[]): Promise<ExamResult>;
  abstract getExamResult(examId: string): Promise<ExamResult | null>;
}
