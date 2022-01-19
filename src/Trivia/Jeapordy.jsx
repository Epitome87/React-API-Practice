import React, { useEffect, useState } from "react";
import TriviaItem from "./TriviaItem";
import axios from "axios";
import { v4 as uuid } from "uuid";
import classes from "./Jeapordy.module.css";
import JeapordyCategory from "./JeapordyCategory";

const CATEGORY_TO_NUM = {
  generalKnowldge: 9,
  books: 10,
  film: 11,
  music: 12,
  musicalsTheater: 13,
  television: 14,
  videoGames: 15,
  boardGames: 16,
  scienceNature: 17,
  computers: 18,
  mathematics: 19,
  mythology: 20,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  art: 25,
  celebritiesS: 26,
  animals: 27,
  vehicles: 28,
  comics: 29,
  gadgets: 30,
  animeManga: 31,
  cartoonsAnimations: 32,
};

const randomCategoryNumber = () => {
  return Math.floor(Math.random() * 24) + 9;
};

// Represents a Trivia game. Keeps track of a list of Trivia questions
function Jeapordy() {
  const NUM_CATEGORIES = 5;
  const NUM_QUESTIONS_PER_CATEGORY = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTrivia(NUM_CATEGORIES, NUM_QUESTIONS_PER_CATEGORY);
  }, []);

  const fetchQuestion = async (category, difficulty) => {
    const fetchedQuestion = await axios.get(
      `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&encode=base64`
    );

    const result = fetchedQuestion.data.results[0];

    console.log("HELP", fetchedQuestion.data.results);

    const transformedData = {
      id: uuid(),
      incorrectAnswers: result["incorrect_answers"].map((wrongAnswer) =>
        atob(wrongAnswer)
      ),
      correctAnswer: atob(result["correct_answer"]),
      question: atob(result.question),
      category: atob(result.category),
      difficulty: atob(result.difficulty),
    };

    console.log("HALPPP", transformedData);
    return transformedData;
  };

  const fetchCategoryOfQuestions = async (
    category,
    questionsPerCategory = 5
  ) => {
    const categoryOfQuestions = [];

    for (let i = 0; i < questionsPerCategory; i++) {
      let difficulty = "hard";

      if (i < 2) difficulty = "easy";
      else if (i < 4) difficulty = "medium";

      const question = await fetchQuestion(category, difficulty);
      question.value = (i + 1) * 100;
      categoryOfQuestions.push(question);
    }

    return { category, questions: categoryOfQuestions };
  };

  const fetchTrivia = async (numCategories, numQuestionsPerCategory) => {
    // Each item in this array contains a list of questions related to that category
    const categories = [];

    for (let i = 0; i < numCategories; i++) {
      const categoryOfQuestions = await fetchCategoryOfQuestions(
        randomCategoryNumber(),
        numQuestionsPerCategory
      );
      categories.push(categoryOfQuestions);
    }

    setTriviaQuestions(categories);
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

  if (triviaQuestions) console.log(triviaQuestions);

  const renderedCategories = () => {
    return (
      <div className={classes.Board}>
        {triviaQuestions.map((category, index) => {
          return <JeapordyCategory category={category} />;
        })}
      </div>
    );
  };

  return <section className={classes.Trivia}>{renderedCategories()}</section>;
}

export default Jeapordy;
