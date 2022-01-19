import React, { useState } from "react";
import classes from "./JeapordyItem.module.css";

// Contains a trivia question, along with its answers (typically multiple choice)
function JeapordyItem({
  question,
  correctAnswer,
  incorrectAnswers,
  difficulty,
  value,
  handleClickAnswer,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const visibleContent = (
    <article
      className={classes.JeapordyItem}
      style={{
        position: "relative",
        boxShadow: "0 0 0 1600px rgba(0, 0, 0, 0.95)",
      }}
    >
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

  const invisibleContent = (
    <article
      className={classes.JeapordyItem}
      onClick={() => setIsVisible(true)}
    >
      <p>${value}</p>
    </article>
  );

  return isVisible ? visibleContent : invisibleContent;
}

export default JeapordyItem;
