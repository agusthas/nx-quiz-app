export type OpenTDBQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type OpenTDBQuestionResponse = {
  response_code: number;
  results: OpenTDBQuestion[];
};
