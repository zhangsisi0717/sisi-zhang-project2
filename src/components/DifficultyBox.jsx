import React from "react";
import "./DifficultyBox.css";

export default function DifficultyBox() {
  return (
    <div className="diff-box-outer-container">
      <div className="game-level-box">Easy</div>
      <div className="game-level-box">Medium</div>
      <div className="game-level-box">Difficult</div>
    </div>
  );
}
