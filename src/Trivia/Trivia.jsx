import React, { useEffect, useState } from "react";
import TriviaItem from "./TriviaItem";
import axios from "axios";
import classes from "./Trivia.module.css";

// Represents a Trivia game. Keeps track of a list of Trivia questions
function Trivia() {
  const [isLoading, setIsLoading] = useState(true);
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTrivia(10);
  }, []);

  const fetchTrivia = async (numTrivia) => {
    const data = await axios.get(
      `https://opentdb.com/api.php?amount=${numTrivia}`
    );

    setTriviaQuestions(data.data.results);
    setIsLoading(false);
  };

  const handleSubmitAnswer = (guess) => {
    if (guess === triviaQuestions[currentQuestionNumber]["correct_answer"]) {
      setScore((score) => score + 1);
      setCurrentQuestionNumber((num) => num + 1);
    } else {
      console.log("WRONG");
    }
  };

  if (isLoading) return <p>Loading Trivia...</p>;

  return (
    <section className={classes.Trivia}>
      <TriviaItem
        questionNumber={currentQuestionNumber + 1}
        question={triviaQuestions[currentQuestionNumber].question}
        correctAnswer={triviaQuestions[currentQuestionNumber]["correct_answer"]}
        incorrectAnswers={
          triviaQuestions[currentQuestionNumber]["incorrect_answers"]
        }
        handleClickAnswer={handleSubmitAnswer}
      />
      <button onClick={handleSubmitAnswer}>Skip Question</button>
    </section>
  );
}

export default Trivia;
