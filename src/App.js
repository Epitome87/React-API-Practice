import './App.css';
import React from "react";
import AdviceList from './Advice/AdviceList';
import Trivia from './Trivia/Trivia';
import Jeapordy from './Trivia/Jeapordy';

function App() {

  return (
    <div className="App">
      {/* <AdviceList /> */}
      {/* <Trivia /> */}
      <Jeapordy />
    </div>
  );
}

export default App;
