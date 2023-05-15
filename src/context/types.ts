type Question = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "hard" | "medium" | "easy";
  question: string;
  correct_answer: string;
  answers: string[];
};

type Answer = {
  answer: string;
  isCorrect: boolean;
  points: number;
};

type Context = {
  state: {
    questions: Question[];
    answers: Answer[];
  };
  actions: {
    getQuestions: () => Promise<void>;
    saveAnswer: (question: Question, answer: string, points: number) => void;
  };
};

export type { Context, Question, Answer };
