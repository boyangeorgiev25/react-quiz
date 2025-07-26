import { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
import Header from "./componenets/Header";
import data from "./questions.json";

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return { ...state, index: state.index + 1, time: (state.time = 30) };
    case "setAnswer":
      return { ...state, answer: action.payload };
    case "addPoints":
      return { ...state, points: state.points + 10 };
    case "tick":
      return { ...state, time: state.time - 1 };
    case "start":
      return { ...state, isStarted: (state.isStarted = true) };
    default:
      throw Error("Error");
  }
}

export default function App() {
  const initaData = {
    index: 0,
    points: 0,
    time: 30,
    answer: null,
    isStarted: false,
  };
  const [state, dispatch] = useReducer(reducer, initaData);
  const { index, points, time, answer, isStarted } = state;

  const question = data.questions[index];

  useEffect(() => {
    if (state.time === 0) {
      dispatch({ type: "next" });
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.time]);

  return (
    <div className="App">
      {!isStarted ? (
        <Start isStarted={dispatch} question={data.questions} />
      ) : (
        <>
          <Header />
          <ProgressBar index={index} numQuestions={data.questions.length} />
          <Points questions={data.questions} points={points} />
          <Question question={question} />
          <Options
            options={question.options}
            answer={answer}
            correctAnswer={question.correctOption}
            dispatch={dispatch}
          />
          <Timer time={time} />
          <NextBtn answer={answer} dispatch={dispatch} />
        </>
      )}
    </div>
  );

  function Start({ isStarted, question }) {
    return (
      <div className="start">
        <Header></Header>
        <h3>You have {question.length} questions to compelte!</h3>
        <h4>Good Luck :)</h4>
        <button className="btn" onClick={() => isStarted({ type: "start" })}>
          Start
        </button>
      </div>
    );
  }

  function Points({ questions, points }) {
    return (
      <p className="progress">
        Points: {points}/{questions.length * 10}
      </p>
    );
  }
  function Timer({ time }) {
    return <p className="timer">⏳ {time}s</p>;
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

  function Options({ options, answer, correctAnswer, dispatch }) {
    return (
      <div>
        {options.map((opt, i) => {
          let isSelected = answer === i;
          let isCorrect = i === correctAnswer;
          let className = "btn btn-option";
          if (answer !== null) {
            if (isCorrect) className += " correct";
          }
          if (isSelected && isCorrect) {
            className += " correct";
          } else if (isSelected && !isCorrect) className += " wrong";

          return (
            <div className="options">
              <button
                disabled={answer !== null}
                className={className}
                key={i}
                onClick={() => {
                  dispatch({ type: "setAnswer", payload: i });
                  if (correctAnswer === i) {
                    dispatch({ type: "addPoints", payload: 10 });
                  }
                }}
              >
                {opt}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  function NextBtn({ answer, dispatch }) {
    return answer === null ? (
      <></>
    ) : (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "setAnswer", payload: null });
          dispatch({ type: "next" });
        }}
      >
        Next
      </button>
    );
  }
}
