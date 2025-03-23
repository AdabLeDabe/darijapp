import { Question } from "../types/Question";
import { Word } from "../types/Word";
import { QuestionType } from "../types/QuestionType";
import { words } from "../data/words";
import { useState, JSX } from "react";

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

function GetRandomWord(wordToAvoid: Word[] | null = null) {
  if (wordToAvoid == null) {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
  }

  let generatedWord: Word;
  do {
    generatedWord = GetRandomWord();
  } while (wordToAvoid.includes(generatedWord))

  return generatedWord;
}

function GenerateNewQuestion() {
  const wordToTranslate: Word = GetRandomWord();
  let words = [wordToTranslate];
  for (let i = 0; i < 3; i++) {
    words.push(GetRandomWord(words));
  }
  return {
    CorrectAnswer : wordToTranslate,
    Answers: shuffleArray([
      words[0],
      words[1],
      words[2],
      words[3]]),
    Type : Math.floor(Math.random() * 2) as QuestionType
  };
}

const QuestionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<Word | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(GenerateNewQuestion());

  function getOptionClassName(answer: Word) {
    let className = "button";
    if (selectedOption === answer) {
      className += " selected";
    }
    return className;
  }

  function checkAnswer() {
    if (selectedOption === null)
    {
      alert("Choisissez une réponse");
      return;
    }
    else if (selectedOption === currentQuestion.CorrectAnswer)
    {
      alert("Bonne réponse");
    }
    else
    {
      if (currentQuestion.Type === QuestionType.ArabicToFrench)
        alert(`Mauvaise réponse, la bonne réponse était ${currentQuestion.CorrectAnswer.French}`)
      else
        alert(`Mauvaise réponse, la bonne réponse était ${currentQuestion.CorrectAnswer.Arabic} ( ${currentQuestion.CorrectAnswer.LiteralArabic} )`)
    }
    setCurrentQuestion(GenerateNewQuestion());
    setSelectedOption(null);
  }

  var questionDisplay: JSX.Element;
  if (currentQuestion.Type == QuestionType.ArabicToFrench)
  {
    questionDisplay = (
      <div>
        <div className="question">
          <h1>Traduisez l'expression suivante en français:</h1>
          <br />
          <h1>{currentQuestion.CorrectAnswer.LiteralArabic} - {currentQuestion.CorrectAnswer.Arabic}</h1>
          <h2>{currentQuestion.CorrectAnswer.Details}</h2>
        </div>
        <div className="button-grid">
          {currentQuestion.Answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => setSelectedOption(answer)}
            className={getOptionClassName(answer)}>
              <span className="button-text">{answer.French}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
  else
  {
    questionDisplay = (
      <div>
        <div className="question">
          <h1>Traduisez l'expression suivante en arabe:</h1>
          <br />
          <h1>{currentQuestion.CorrectAnswer.French}</h1>
          <h2>{currentQuestion.CorrectAnswer.Details}</h2>
        </div>
        <div className="button-grid">
          {currentQuestion.Answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => setSelectedOption(answer)}
            className={getOptionClassName(answer)}>
              <span className="button-text">{answer.LiteralArabic} - {answer.Arabic}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {questionDisplay}
      <br />
      <button className="button" onClick={checkAnswer}>
        <span className="button-text">Valider</span>
      </button>
    </div>
  );
}

export default QuestionComponent;