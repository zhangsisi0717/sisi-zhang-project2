import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import WordElement from "./WordElement";
import "./InputHistory.css";

export default function InputHistory(props) {
  const dispatch = useDispatch();
  const numChances = props.diffInfo[props.difficulty].total;
  const [userInput, setInput] = useState("");
  const [gameOver, setOver] = useState(false);
  const inputHistory = useSelector((state) => state.getHistory, shallowEqual);
  console.log("input history == ");
  console.log(inputHistory);
  const numAttempts = useSelector((state) => state.getAttempts, shallowEqual);
  console.log("num attempts ===");
  console.log(numAttempts);
  const gameAttribute = useSelector(
    (state) => state.getGameAttribute,
    shallowEqual
  );

  console.log(gameAttribute.gameDifficulty);

  if (
    !gameAttribute.isGameOn ||
    gameAttribute.gameDifficulty !== props.difficulty ||
    !gameAttribute.answer
  ) {
    dispatch({ type: "SET_GAME_ON", value: props.difficulty });
  }

  const target = gameAttribute.answer;

  function isInputValid(target, input) {
    if (input.length < target.length) {
      console.log("length is not equal");
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Please input longer word",
      });
      return false;
    } else if (input.length > target.length) {
      console.log("length is not equal");
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Please input shorter word",
      });
      return false;
    }
    return true;
  }

  function createTargetCounter(target) {
    const map = new Map();
    for (let i = 0; i < target.length; i++) {
      if (!map.get(target[i])) {
        map.set(target[i], 1);
      } else {
        map.set(target[i], map.get(target[i]) + 1);
      }
    }
    return map;
  }

  function wordCheckFirst(target, input, re, map) {
    for (let i = 0; i < target.length; i++) {
      if (target[i] === input[i]) {
        re.push([input[i], "green"]); //letter matched, then set it to green directly
        map.set(target[i], map.get(target[i]) - 1);
      } else if (!map.get(input[i])) {
        // letter does not exist in target, set it to grey directly
        re.push([input[i], "gray"]);
      } else {
        re.push([input[i], ""]);
      }
    }
  }

  function wordCheckSecond(target, input, re, map) {
    for (const [index, element] of re.entries()) {
      if (!element[1]) {
        if (map.get(element[0]) > 0) {
          re[index][1] = "yellow";
          map.set(element[0], map.get(element[0]) - 1);
        } else {
          re[index][1] = "grey";
        }
      }
    }
  }

  function checkCorrectness(target, input) {
    if (input === target) {
      setOver(true);
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({
        type: "CHANGE_MESSAGE",
        value: `Congratulations! You win!`,
      });
    } else if (numChances - numAttempts <= 1) {
      setOver(true);
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({
        type: "CHANGE_MESSAGE",
        value: `Sorry, you lose`,
      });
    } else {
      const map = createTargetCounter(target);
      const re = [];
      wordCheckFirst(target, input, re, map);
      wordCheckSecond(target, input, re, map);
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({ type: "ADD_TO_HISTORY", value: re });
    }
  }

  function checkWord(target, input) {
    if (isInputValid(target, input)) {
      checkCorrectness(target, input);
    }
  }

  const allWords = inputHistory.map((element, index) => (
    <WordElement key={index} wordInfo={element} />
  ));

  return (
    <div>
      <div className="diffIndicator">
        <div>Level: {props.difficulty}</div>
        <div>Attempts Left: {numChances - numAttempts}</div>
      </div>
      <div className="input-outer-container">
        <div className="input-field">
          <input
            className="userInput"
            value={userInput}
            onInput={(event) => {
              setInput(event.target.value);
            }}
          />
          <button
            className="submit-button"
            disabled={gameOver}
            onClick={() => {
              checkWord(target, userInput);
            }}
          >
            submit
          </button>
        </div>
        <div className="word-list">{allWords}</div>
        <div
          className="restart-button"
          onClick={() => {
            console.log("restart button clicked");
            setInput("");
            dispatch({ type: "RESET" });
          }}
        >
          Restart
        </div>
      </div>
    </div>
  );
}
