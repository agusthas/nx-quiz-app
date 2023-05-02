import { Answer, QuestionSet, Result } from 'src/store/types';

export const getResult = (
  answers: Answer[],
  questions: QuestionSet['questions']
): Result => {
  const answered = answers.filter((val) => val).length;
  const correct = answers.filter(
    (answer, index) => questions[index].correctAnswer === answer
  ).length;
  const incorrect = answered - correct;

  return {
    answered,
    correct,
    incorrect,
  };
};
