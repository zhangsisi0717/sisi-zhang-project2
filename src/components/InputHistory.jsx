import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import WordElement from "./WordElement";
import "./InputHistory.css";
import {
  allWordsEasySet,
  allWordsMediumSet,
  allWordsHardSet,
} from "../files/wordsCollection";

export default function InputHistory(props) {
  const dispatch = useDispatch();
  const numChances = props.diffInfo[props.difficulty].total;
  const [userInput, setInput] = useState("");
  const inputHistory = useSelector((state) => state.getHistory, shallowEqual);
  const numAttempts = useSelector((state) => state.getAttempts, shallowEqual);
  const gameAttribute = useSelector(
    (state) => state.getGameAttribute,
    shallowEqual
  );
  const usedWords = useSelector((state) => state.getUsedWords, shallowEqual);
  const isGameOver = useSelector((state) => state.isGameOver, shallowEqual);
  console.log("here1, usedWords ===");
  console.log(usedWords);
  // console.log(gameAttribute.gameDifficulty);

  if (
    !gameAttribute.isGameOn ||
    gameAttribute.gameDifficulty !== props.difficulty ||
    !gameAttribute.answer
  ) {
    dispatch({ type: "SET_GAME_ON", value: props.difficulty });
  }

  const target = gameAttribute.answer;

  function isInputAlreadyUsed(input) {
    console.log("isInputAlreadyUsed called");
    console.log(usedWords);
    input = input.toUpperCase();
    console.log(`input == ${input}`);
    if (usedWords.includes(input)) {
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Already used this word, please enter a new one!",
      });
      return true;
    }
    return false;
  }

  function isInputCorrectLength(target, input) {
    if (input.length < target.length) {
      // console.log("length is not equal");
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Please input longer word",
      });
      return false;
    } else if (input.length > target.length) {
      // console.log("length is not equal");
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Please input shorter word",
      });
      return false;
    }
    return true;
  }

  function isInputAllLetters(input) {
    for (let e of input) {
      if (e.toLowerCase() === e.toUpperCase()) {
        dispatch({
          type: "CHANGE_MESSAGE",
          value: "Not a word, please input a valid word!",
        });
        return false;
      }
    }
    return true;
  }

  function isInputValidWord(input) {
    input = input.toLowerCase();
    if (props.difficulty === "easy" && allWordsEasySet.has(input)) {
      return true;
    } else if (props.difficulty === "medium" && allWordsMediumSet.has(input)) {
      return true;
    } else if (props.difficulty === "hard" && allWordsHardSet.has(input)) {
      return true;
    } else {
      dispatch({
        type: "CHANGE_MESSAGE",
        value: "Not a word, please input a valid word",
      });
      return false;
    }
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
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({ type: "SET_GAME_OVER" });
      dispatch({
        type: "CHANGE_MESSAGE",
        value: `Congratulations! You win! The answer is '${target}'`,
      });
    } else if (numChances - numAttempts <= 1) {
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({ type: "SET_GAME_OVER" });
      dispatch({
        type: "CHANGE_MESSAGE",
        value: `Sorry, you lose. The answer is '${target}'`,
      });
    } else {
      const map = createTargetCounter(target);
      const re = [];
      wordCheckFirst(target, input, re, map);
      wordCheckSecond(target, input, re, map);
      dispatch({ type: "CHANGE_MESSAGE", value: "" });
      dispatch({ type: "ADD_ONE_ATTEMPT" });
      dispatch({ type: "ADD_TO_HISTORY", value: re });
      dispatch({ type: "ADD_WORD", value: input });
    }
  }

  function checkWord(target, input) {
    if (
      isInputCorrectLength(target, input) &&
      isInputAllLetters(input) &&
      isInputValidWord(input) &&
      !isInputAlreadyUsed(input)
    ) {
      target = target.toUpperCase();
      input = input.toUpperCase();
      checkCorrectness(target, input);
    }
  }

  const allWords = inputHistory.map((element, index) => (
    <WordElement key={index} wordInfo={element} />
  ));

  return (
    <div className="input-history">
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
            disabled={isGameOver}
            onClick={() => {
              checkWord(target, userInput);
            }}
          >
            Submit
          </button>
        </div>
        <div className="word-list">{allWords}</div>
        <div
          className="restart-button"
          onClick={() => {
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
