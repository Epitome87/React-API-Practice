import React from "react";
import classes from "./AdviceItem.module.css";

function AdviceItem({ advice }) {
  return (
    <article className={classes.AdviceItem}>
      <p>{advice}</p>
    </article>
  );
}

export default AdviceItem;
