import React from "react";
import "./DifficultyBox.css";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DifficultyBox() {
  const difficulty = useSelector(
    (state) => state.getGameAttribute.gameDifficulty,
    shallowEqual
  );

  const numAttempts = useSelector((state) => state.getAttempts, shallowEqual);

  let easyStr =
    difficulty === "easy" && numAttempts > 0 ? "Easy (Continue)" : "Easy";
  let mediumStr =
    difficulty === "medium" && numAttempts > 0 ? "Medium (Continue)" : "Medium";
  let hardStr =
    difficulty === "hard" && numAttempts > 0 ? "Hard (Continue)" : "Hard";
  return (
    <div className="diff-box-outer-container">
      <a href="/game/easy">
        <div className="game-level-box">{easyStr}</div>
      </a>
      <a href="/game/medium">
        <div className="game-level-box">{mediumStr}</div>
      </a>
      <a href="/game/hard">
        <div className="game-level-box">{hardStr}</div>
      </a>
    </div>
  );
}
