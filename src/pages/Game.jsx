import React, { useState } from "react";
import NaviBar from "../components/NaviBar";
import { useParams } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
import InputHistory from "../components/InputHistory";
import "./Game.css";

export default function Game() {
  const pathParams = useParams();
  const difficulty = pathParams.difficulty;
  const diffInfo = {
    easy: { total: 7, length: 5 },
    medium: { total: 6, length: 6 },
    hard: { total: 5, length: 7 },
  };

  const message = useSelector((state) => {
    return state.getMessage;
  }, shallowEqual);

  console.log(message);
  return (
    <div className="game-outline-box">
      <div className="header-message">
        Please input words with length of {diffInfo[difficulty].length}
      </div>
      <div className="message-box">{message}</div>
      <InputHistory difficulty={difficulty} diffInfo={diffInfo} />
    </div>
  );
}

// <div className="diffIndicator">
// <div>Level: {difficulty}</div>
// <div>Attempts Left: 5</div>
// </div>
