import { QuestionSet } from 'src/store/types';
import { OpenTDBQuestionResponse } from 'src/types';

export const createQuestionSet = (
  data: OpenTDBQuestionResponse
): QuestionSet => {
  const id = Math.random().toString(36).substring(7);

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 3 * 60 * 1000); // 3 minutes
  return {
    id,
    start: startDate,
    end: endDate,
    category: data.results[0].category,
    difficulty: data.results[0].difficulty,
    questions: data.results.map((question) => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      answers: [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    })),
  };
};
