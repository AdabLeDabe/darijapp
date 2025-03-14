import { Word } from "./Word";
import { QuestionType } from "./QuestionType";

export interface Question {
  Answer: Word;
  WrongAnswers: Word[];
  Type: QuestionType;
}