import React from "react";
import classes from "./JeapordyCategory.module.css";
import JeapordyItem from "./JeapordyItem";

function JeapordyCategory({ category }) {
  return (
    <div className={classes.Category}>
      <h2 className={classes.CategoryName}>{category.questions[0].category}</h2>
      {category.questions.map((question, index) => {
        return (
          <JeapordyItem
            key={question.id}
            questionNumber={index + 1}
            question={question.question}
            correctAnswer={question.correctAnswer}
            incorrectAnswers={question.incorrectAnswers}
            difficulty={question.difficulty}
            value={question.value}
            handleClickAnswer={() => {}}
          />
        );
      })}
    </div>
  );
}

export default JeapordyCategory;
