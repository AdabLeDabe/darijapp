import { Word } from "./Word";
import { QuestionType } from "./QuestionType";

export interface Question {
  CorrectAnswer: Word;
  Answers: Word[];
  Type: QuestionType;
}