export type User = {
  email: string;
  password: string;
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

export type QuestionSet = {
  id: string;
  category: string;
  difficulty: string;
  start: Date;
  end: Date;
  questions: Question[];
};

export type Answer = {
  [questionNumber: number]: string;
};

export type Result = {
  answered: number;
  correct: number;
  incorrect: number;
};

export type AppState = {
  user?: User;
  login: (email: string, password: string) => void;
  logout: () => void;

  questionSet?: QuestionSet;
  isLoading: boolean;
  setQuestionSet: (url: string) => Promise<void>;
  clearQuestionSet: () => void;

  answers: Answer[];
  pushAnswer: (questionNumber: number, answer: string) => void;
  clearAnswers: () => void;

  result: Result;
  setResult: (result: Result) => void;
  clearResult: () => void;

  currentQuestion: number;
  setCurrentQuestion: (questionNumber: number) => void;

  clearAppState: () => void;
};
