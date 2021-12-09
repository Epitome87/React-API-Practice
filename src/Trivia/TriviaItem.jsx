import React from "react";
import classes from "./TriviaItem.module.css";

// Contains a trivia question, along with its answers (typically multiple choice)
function TriviaItem({
  question,
  questionNumber,
  correctAnswer,
  incorrectAnswers,
  handleClickAnswer,
}) {
  return (
    <article className={classes.TriviaItem}>
      <h2>
        Question #{questionNumber}: {question}
      </h2>
      <ol>
        {incorrectAnswers.map((answer) => {
          return <li onClick={() => handleClickAnswer(answer)}>{answer}</li>;
        })}
        <li onClick={() => handleClickAnswer(correctAnswer)}>
          {correctAnswer}
        </li>
      </ol>
    </article>
  );
}

export default TriviaItem;
