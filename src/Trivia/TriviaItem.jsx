import React from "react";
import classes from "./TriviaItem.module.css";

// Contains a trivia question, along with its answers (typically multiple choice)
function TriviaItem({
  question,
  correctAnswer,
  incorrectAnswers,
  handleClickAnswer,
}) {
  return (
    <article className={classes.TriviaItem}>
      <h2>{question}</h2>
      <ol>
        {incorrectAnswers.map((answer) => {
          return <li onClick={() => handleClickAnswer(answer)}>{answer}</li>;
        })}
        <li onClick={() => handleClickAnswer(correctAnswer)}>
          <p>{correctAnswer}</p>
        </li>
      </ol>
    </article>
  );
}

export default TriviaItem;
