import { useState } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import data from "./questions.json";

export default function App() {
  const [index, setIndex] = useState(0);
  const question = data.questions[index];
  const [answer, setAnswer] = useState(null);

  return (
    <div className="App">
      <Header></Header>
      <Question question={question} />
      <Options
        options={question.options}
        answer={answer}
        correctAnswer={question.correctOption}
        setAnswer={setAnswer}
      />
      <NextBtn setIndex={setIndex} />
    </div>
  );
}

function Question({ question }) {
  return <p className="question">{question.question}</p>;
}

function Options({ options }) {
  return (
    <div className="options">
      {options.map((opt, i) => (
        <button className="btn btn-option" key={i}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function NextBtn({ setIndex }) {
  return (
    <button className="btn btn-ui" onClick={() => setIndex((i) => i + 1)}>
      Next
    </button>
  );
}
