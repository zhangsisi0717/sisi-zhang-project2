import React from "react";
import "./DifficultyBox.css";
import { Link } from "react-router-dom";

export default function DifficultyBox() {
  return (
    <div className="diff-box-outer-container">
      <a href="/game/easy">
        <div className="game-level-box">Easy</div>
      </a>
      <a href="/game/medium">
        <div className="game-level-box">Medium</div>
      </a>
      <a href="/game/hard">
        <div className="game-level-box">Hard</div>
      </a>
    </div>
  );
}
