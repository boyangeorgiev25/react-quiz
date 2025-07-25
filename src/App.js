import { useReducer, useState } from "react";
// import DateCounter from "./DateCounter";
import Header from "./Header";
import data from "./questions.json";

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return { ...state, index: state.index + 1 };
    default:
      throw Error("Error");
  }
}

export default function App() {
  const initaData = { index: 0 };
  const [state, dispatch] = useReducer(reducer, initaData);
  const { index } = state;

  const question = data.questions[index];

  const [answer, setAnswer] = useState(null);
  return (
    <div className="App">
      <Header></Header>
      <ProgressBar index={index} numQuestions={data.questions.length} />
      <Question question={question} />
      <Options
        options={question.options}
        answer={answer}
        correctAnswer={question.correctOption}
        setAnswer={setAnswer}
      />
      <NextBtn setAnswer={setAnswer} onChange={dispatch} />
    </div>
  );
}

function ProgressBar({ index, numQuestions }) {
  const percentage = Math.round(((index + 1) / numQuestions) * 100);

  return (
    <header className="progress">
      <progress max="100" value={percentage}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
    </header>
  );
}

function Question({ question }) {
  return <p className="question">{question.question}</p>;
}

function Options({ options, answer, correctAnswer, setAnswer }) {
  return (
    <div>
      {options.map((opt, i) => {
        let isSelected = answer === i;
        let isCorrect = i === correctAnswer;
        let className = "btn btn-option";
        if (answer !== null) {
          if (isCorrect) className += " correct";
        }
        if (isSelected && isCorrect) className += " correct";
        else if (isSelected && !isCorrect) className += " wrong";

        return (
          <div className="options">
            <button
              disabled={answer !== null}
              className={className}
              key={i}
              onClick={() => setAnswer(i)}
            >
              {opt}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function NextBtn({ setAnswer, onChange }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        setAnswer(null);
        onChange({ type: "next" });
      }}
    >
      Next
    </button>
  );
}
