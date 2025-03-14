import { Question } from "../types/Question";
import { Word } from "../types/Word";
import { QuestionType } from "../types/QuestionType";
import { words } from "../data/words";

const wordsList = [...words];

function GetRandomWord(wordToAvoid: Word | null = null) {
  if (wordToAvoid == null) {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
  }

  var generatedWord: Word;
  do {
    generatedWord = GetRandomWord();
  } while (generatedWord == wordToAvoid)

  return generatedWord;
}

const QuestionComponent = () => {
  const wordToTranslate: Word = GetRandomWord();
  const question: Question = {
    Answer : wordToTranslate,
    WrongAnswers: [GetRandomWord(wordToTranslate), GetRandomWord(wordToTranslate), GetRandomWord(wordToTranslate)],
    Type : Math.floor(Math.random() * 2) as QuestionType
  };

  if (question.Type == QuestionType.ArabicToFrench)
  {
    return (
      <div>
        <h3>Traduisez en français:</h3>
        <h2>{question.Answer.Arabic}</h2>
        <h3>{question.Answer.Details}</h3>
        <br />
        <button>{question.Answer.French}</button>
        <button>{question.WrongAnswers[0].French}</button>
        <button>{question.WrongAnswers[1].French}</button>
        <button>{question.WrongAnswers[2].French}</button>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h3>Traduisez en Arabe:</h3>
        <h2>{question.Answer.French}</h2>
        <br />
        <button>{question.Answer.Arabic}</button>
        <button>{question.WrongAnswers[0].Arabic}</button>
        <button>{question.WrongAnswers[1].Arabic}</button>
        <button>{question.WrongAnswers[2].Arabic}</button>
      </div>
    )
  }
}

export default QuestionComponent;