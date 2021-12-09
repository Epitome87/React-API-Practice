import React, { useState, useEffect } from "react";
import classes from "./AdviceList.module.css";
import AdviceItem from "./AdviceItem";
import axios from "axios";

function AdviceList() {
  const [advice, setadvice] = useState();

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleButtonClick = async (event) => {
    fetchAdvice();
  };

  const fetchAdvice = async () => {
    const advice = await axios.get("https://api.adviceslip.com/advice");
    setadvice(advice.data.slip.advice);
  };

  return (
    <section className={classes.AdviceList}>
      <AdviceItem advice={advice} />
      <button onClick={handleButtonClick}>Get Advice!</button>
    </section>
  );
}

export default AdviceList;
