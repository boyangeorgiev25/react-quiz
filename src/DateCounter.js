import { type } from "@testing-library/user-event/dist/type";
import { useReducer, useState } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);

  function reducer(state, action) {
    console.log(state, action);

    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - state.step };
      case "inc":
        return { ...state, count: state.count + state.step };
      case "setCount":
        return { ...state, count: action.payload };
      case "defSteps":
        return { ...state, step: action.payload };
      case "res":
        return { ...state, count: 0, step: 1 };
      default:
        throw new Error("Unknown action");
    }
  }

  const initState = { count: 0, step: 1 }; // starts from here
  const [state, dispatch] = useReducer(reducer, initState); //
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defSteps", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "res" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
