import React, { useEffect, useState } from "react";
import TriviaItem from "./TriviaItem";
import axios from "axios";
import classes from "./Trivia.module.css";

// Represents a Trivia game. Keeps track of a list of Trivia questions
function Jeapordy() {
  const NUM_QUESTIONS = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTrivia(NUM_QUESTIONS);
  }, []);

  const fetchTrivia = async (numTrivia) => {
    // Each item in this array contains a list of questions related to that category
    const categories = [];

    for (let categoryIndex = 0; categoryIndex < 5; categoryIndex++) {
      const category = [];
      for (let i = 0; i < 5; i++) {
        let difficulty = "hard";

        if (i < 2) difficulty = "easy";
        else if (i < 4) difficulty = "medium";

        category.push(
          await axios.get(
            `https://opentdb.com/api.php?amount=1&category=${categoryIndex}&difficulty=${difficulty}&encode=base64`
          )
        );
      }

      categories.push(category);
    }

    console.log("WTF", categories);

    const transformedCategories = [];

    // Transform API's returned data to better suit our use case
    for (let i = 0; i < 1; i++) {
      const transformedCategory = [];

      for (let j = 0; j < 5; j++) {
        console.log("RES", categories[i].data);
        const transformedQuestion = categories[i][j].data.results.map(
          (result) => {
            return {
              incorrectAnswers: result["incorrect_answers"].map((wrongAnswer) =>
                atob(wrongAnswer)
              ),
              correctAnswer: atob(result["correct_answer"]),
              question: atob(result.question),
            };
          }
        );
        console.log("TRAN Q", transformedQuestion);
        transformedCategory.push(transformedQuestion);
      }

      console.log("TRAN CAT", transformedCategory);
      transformedCategories.push(transformedCategory);
    }

    console.log("TRIV", transformedCategories);
    setTriviaQuestions(transformedCategories);
    setIsLoading(false);
  };

  const handleSubmitAnswer = (guess) => {
    if (guess === triviaQuestions[currentQuestionNumber].correctAnswer) {
      setScore((score) => score + 1);
      setCurrentQuestionNumber((num) => num + 1);
    } else {
      console.log("WRONG");
    }
  };

  if (isLoading) return <p>Loading Trivia...</p>;

  const renderedCategory = (
    <div>
      {triviaQuestions[0].map((question) => {
        console.log("COME ON PLZ", question[0]);
        return (
          <TriviaItem
            questionNumber={currentQuestionNumber + 1}
            question={question[0]}
            correctAnswer={question[0].correctAnswer}
            incorrectAnswers={question[0].incorrectAnswers}
            handleClickAnswer={handleSubmitAnswer}
          />
        );
      })}
    </div>
  );

  //   return { renderedCategory };
  return (
    <section className={classes.Trivia}>
      <p className={classes.questionNumber}>
        Question #{currentQuestionNumber + 1} of {NUM_QUESTIONS}
      </p>
      <TriviaItem
        questionNumber={currentQuestionNumber + 1}
        question={triviaQuestions[0][currentQuestionNumber][0].question}
        correctAnswer={
          triviaQuestions[0][currentQuestionNumber][0].correctAnswer
        }
        incorrectAnswers={
          triviaQuestions[0][currentQuestionNumber][0].incorrectAnswers
        }
        handleClickAnswer={handleSubmitAnswer}
      />
      <p className={classes.score}>Score: {score}</p>
      <button onClick={handleSubmitAnswer}>Skip Question</button>
    </section>
  );
}

export default Jeapordy;
