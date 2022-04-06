import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./RuleBox.css";

export default function RuleBox() {
  const gameAttribute = useSelector(
    (state) => state.getGameAttribute,
    shallowEqual
  );
  console.log(gameAttribute.gameDifficulty);
  let gameURL = `/game/${gameAttribute.gameDifficulty}`;
  return (
    <div className="outer-container">
      <div className="rule-title">Game Rule</div>
      <p className="rule-content">
        Welcome to Wordle, the rule is pretty simple as follows: firstly, the
        game secretly chooses a random word based on different difficulty
        level(easy, medium, hard). Then you need to guess within a certain
        number of attempts. Both the length of the word and the number of
        attempts are based on the difficulty selected by you. If you chose an
        incorrect word, you will receive clues based on the location of the
        letters in the word. For instance, if the correct word is “faces”, and
        you submits “eater”. In this situation, the E is in the word but not in
        the correct spot, then first "E" will be highlighted yellow; the A is in
        the word and in the correct spot, so this is marked by the green. Second
        "E" will be marked in gray like the other missing letters since E only
        appears once in the word, thus will only be highlighted yellow once.
      </p>
      <a href={gameURL}>
        <div className="back-to-game-button" disabled={!gameAttribute.isGameOn}>
          Back To Game
        </div>
      </a>
    </div>
  );
}
