import { useState } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import data from "./questions.json";

export default function App() {
  const [index, setIndex] = useState(0);
  const question = data.questions[index];

  return (
    <div className="App">
      <Header></Header>
      <Question question={question} />
      <Options options={question.options} />
      <NextBtn setIndex={setIndex} />
    </div>
  );
}

function Question({ question }) {
  return <h4 className="start">{question.question}</h4>;
}

function Options({ options }) {
  return (
    <div className="options">
      {options.map((opt, i) => (
        <button className="btn" key={i}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function NextBtn({ setIndex }) {
  return (
    <button className="btn" onClick={() => setIndex((i) => i + 1)}>
      Next
    </button>
  );
}
