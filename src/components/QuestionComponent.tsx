import { Question } from "../types/Question";
import { Word } from "../types/Word";
import { QuestionType } from "../types/QuestionType";
import { words } from "../data/words";
import { useState } from "react";

const wordsList = [...words];

function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the original array to avoid modifying it
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at indices i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

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

function GenerateNewQuestion() {
  const wordToTranslate: Word = GetRandomWord();
  return {
    CorrectAnswer : wordToTranslate,
    Answers: shuffleArray([
      wordToTranslate,
      GetRandomWord(wordToTranslate),
      GetRandomWord(wordToTranslate),
      GetRandomWord(wordToTranslate)]),
    Type : Math.floor(Math.random() * 2) as QuestionType
  };
}

const QuestionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<Word | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(GenerateNewQuestion());

  function getOptionClassName(answer: Word) {
    let className = "option-button";
      
      if (selectedOption === answer) {
        className += " selected";
      }
      
      // if (isAnswered) {
      //   if (answer === correctAnswer) {
      //     className += " correct";
      //   } else if (selectedOption === answer) {
      //     className += " incorrect";
      //   }
      // }
      
      return className;
  }

  if (currentQuestion.Type == QuestionType.ArabicToFrench)
  {
    return (
      <div>
        <h3>Traduisez en français:</h3>
        <h2>{currentQuestion.CorrectAnswer.LiteralArabic} - {currentQuestion.CorrectAnswer.Arabic}</h2>
        <h3>{currentQuestion.CorrectAnswer.Details}</h3>
        <br />
        <div>
          {currentQuestion.Answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => setSelectedOption(answer)}
            className={getOptionClassName(answer)}>{answer.French}</button>
          ))}
        </div>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h3>Traduisez en Arabe:</h3>
        <h2>{currentQuestion.CorrectAnswer.French}</h2>
        <h3>{currentQuestion.CorrectAnswer.Details}</h3>
        <br />
        <div>
          {currentQuestion.Answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => setSelectedOption(answer)}
            className={getOptionClassName(answer)}>{answer.LiteralArabic} - {answer.Arabic}</button>
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionComponent;