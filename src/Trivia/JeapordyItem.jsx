import React, { useState } from "react";
import classes from "./JeapordyItem.module.css";

// Contains a trivia question, along with its answers (typically multiple choice)
function JeapordyItem({
  question,
  correctAnswer,
  incorrectAnswers,
  difficulty,
  value,
  onClickWrongAnswer,
  onClickCorrectAnswer,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = (triviaObj, answer) => {
    if (answer === correctAnswer) onClickCorrectAnswer(triviaObj, answer);
    else onClickWrongAnswer(triviaObj, answer);

    setIsVisible(false);
  };

  const visibleContent = (
    <article
      className={classes.JeapordyItem}
      style={{
        position: "relative",
        boxShadow: "0 0 0 1600px rgba(0, 0, 0, 0.15)",
        width: "95%",
        height: "95vh",
        left: "50%",
        top: "50%",
        transform: "translate(0%, -50%)",
      }}
    >
      <h2>{question}</h2>
      <ol>
        {incorrectAnswers.map((answer) => {
          return (
            <li onClick={() => onClickWrongAnswer({ value }, answer)}>
              {answer}
            </li>
          );
        })}
        <li onClick={() => handleOnClick({ value }, correctAnswer)}>
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
