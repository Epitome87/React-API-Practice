import React, { useEffect, useState } from 'react';
import TriviaItem from './TriviaItem';
import axios from 'axios';
import classes from './Trivia.module.css';

// Represents a Trivia game. Keeps track of a list of Trivia questions
function Trivia() {
  const NUM_QUESTIONS = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTrivia(NUM_QUESTIONS);
  }, []);

  const fetchTrivia = async (numTrivia) => {
    const data = await axios.get(
      `https://opentdb.com/api.php?amount=${numTrivia}&encode=base64`
    );

    // Transform API's returned data to better suit our use case
    const transformedData = data.data.results.map((result) => {
      return {
        incorrectAnswers: result['incorrect_answers'].map((wrongAnswer) =>
          atob(wrongAnswer)
        ),
        correctAnswer: atob(result['correct_answer']),
        question: atob(result.question),
      };
    });

    setTriviaQuestions(transformedData);
    setIsLoading(false);
  };

  const handleSubmitAnswer = (guess) => {
    if (guess === triviaQuestions[currentQuestionNumber].correctAnswer) {
      setScore((score) => score + 1);
      setCurrentQuestionNumber((num) => num + 1);
    } else {
      console.log('WRONG');
    }
  };

  if (isLoading) return <p>Loading Trivia...</p>;

  return (
    <section className={classes.Trivia}>
      <p className={classes.questionNumber}>
        Question #{currentQuestionNumber + 1} of {NUM_QUESTIONS}
      </p>
      <TriviaItem
        questionNumber={currentQuestionNumber + 1}
        question={triviaQuestions[currentQuestionNumber].question}
        correctAnswer={triviaQuestions[currentQuestionNumber].correctAnswer}
        incorrectAnswers={
          triviaQuestions[currentQuestionNumber].incorrectAnswers
        }
        handleClickAnswer={handleSubmitAnswer}
      />
      <p className={classes.score}>Score: {score}</p>
      <button onClick={handleSubmitAnswer}>Skip Question</button>
    </section>
  );
}

export default Trivia;
