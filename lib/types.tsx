enum QuestionType {
  MultipleChoice = "multiple_choice_single",
}

export interface QuizQuestionsData {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  type: QuestionType;
  correctAnswer: number[];
  explanation?: string;
}

export interface QuizConfig {
  topic: string;
  config: {
    questionCount: number;
    subtopics: string[];
    types: string[];
    showAnswers: boolean;
  };
}
