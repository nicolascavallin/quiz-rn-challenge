import React, { createContext, useEffect, useState } from "react";

import type { Answer, Context, Question } from "./types";

const mockQuestions: QuestionResponse[] = [
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of the following is NOT a quote from the 1942 film Casablanca? ",
    correct_answer: "&quot;Frankly, my dear, I don&#039;t give a damn.&quot;",
    incorrect_answers: [
      "&quot;Here&#039;s lookin&#039; at you, kid.&quot;",
      "&ldquo;Of all the gin joints, in all the towns, in all the world, she walks into mine&hellip;&rdquo;",
      "&quot;Round up the usual suspects.&quot;",
    ],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "When was the original Star Wars: Battlefront II released?",
    correct_answer: "October 31, 2005",
    incorrect_answers: [
      "December 18, 2004",
      "November 21, 2006",
      "September 9, 2007",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which company did Valve cooperate with in the creation of the Vive?",
    correct_answer: "HTC",
    incorrect_answers: ["Oculus", "Google", "Razer"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "In the game &quot;The Sims&quot;, how many Simoleons does each family start with?",
    correct_answer: "20,000",
    incorrect_answers: ["10,000", "15,000", "25,000"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "The original mascot of the popular Nintendo game, &quot;Splatoon&quot; was going to be...",
    correct_answer: "Mario",
    incorrect_answers: ["Inklings", "Octolings", "Zelda"],
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which one of these songs did the group &quot;Men At Work&quot; NOT make?",
    correct_answer: "Safety Dance",
    incorrect_answers: [
      "Down Under",
      "Who Can It Be Now?",
      "It&#039;s a Mistake",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "What is the name of the process that sends one qubit of information using two bits of classical information?",
    correct_answer: "Quantum Teleportation",
    incorrect_answers: [
      "Super Dense Coding",
      "Quantum Entanglement",
      "Quantum Programming",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "What does the International System of Quantities refer 1024 bytes as?",
    correct_answer: "Kibibyte",
    incorrect_answers: ["Kylobyte", "Kilobyte", "Kelobyte"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "hard",
    question:
      "What was the name of the German offensive operation in October 1941 to take Moscow before winter?",
    correct_answer: "Operation Typhoon",
    incorrect_answers: [
      "Operation Sunflower",
      "Operation Barbarossa",
      "Case Blue",
    ],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "hard",
    question:
      "In the &quot;Jurassic Park&quot; universe, when did &quot;Jurassic Park: San Diego&quot; begin construction?",
    correct_answer: "1985",
    incorrect_answers: ["1988", "1986", "1993"],
  },
];

type QuestionResponse = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "hard" | "medium" | "easy";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const AppContext = createContext({} as Context);

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const getQuestions = async () => {
    // const response: {
    //   response_code: number;
    //   results: QuestionResponse[];
    // } = await fetch("https://opentdb.com/api.php?amount=10").then((res) =>
    //   res.json(),
    // );

    const response = { results: mockQuestions };

    const questions: Question[] = response.results.map((q) => {
      const _answers = q.incorrect_answers.concat(q.correct_answer);
      _answers.sort(() => Math.random() - 0.5);

      return {
        category: q.category,
        type: q.type,
        answers: _answers,
        correct_answer: q.correct_answer,
        difficulty: q.difficulty,
        question: q.question,
      };
    });

    setQuestions(questions);
  };

  const saveAnswer = (question: Question, answer: string, points: number) => {
    const _answer: Answer = {
      answer,
      isCorrect: answer === question.correct_answer,
      points,
    };

    setAnswers((prev) => [...prev, _answer]);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const state = {
    questions,
    answers,
  };
  const actions = {
    saveAnswer,
    getQuestions,
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext as default, AppProvider };
