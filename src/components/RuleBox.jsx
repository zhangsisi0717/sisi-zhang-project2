import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./RuleBox.css";
import WordElement from "./WordElement";

export default function RuleBox() {
  const gameAttribute = useSelector(
    (state) => state.getGameAttribute,
    shallowEqual
  );
  console.log(gameAttribute.isGameOn);
  let gameURL = `/game/${gameAttribute.gameDifficulty}`;
  return (
    <div className="outer-container">
      <div className="rule-title">Game Rule</div>
      <div className="rule-content">
        <p>
          {" "}
          Welcome to Wordle, the rule is pretty simple as follows: firstly, our
          game chooses a random word based on different difficulty level(easy,
          medium, hard). Then you need to guess within a certain number of
          attempts.{" "}
        </p>
        <p>
          Both the length of the word and the number of attempts are based on
          the difficulty selected by you. If you chose an incorrect word, you
          will receive clues based on the location of the letters in the word.
        </p>{" "}
        <p>
          For instance, if the correct word is <span>"FACES"</span>, and you
          submits <span>"EATER"</span>. In this situation, the E is in the word
          but not in the correct spot, then the first
          <span
            className="
        yellow"
          >
            {" "}
            "E"{" "}
          </span>
          is highlighted{" "}
          <span
            className="
      yellow"
          >
            yellow
          </span>
          ; the A is in the word and in the correct spot, so{" "}
          <span className="green">"A" </span>is marked by the
          <span className="green"> green</span>. Second{" "}
          <span className="gray">"E" </span>will be marked in{" "}
          <span className="gray">gray </span>
          like the other missing letters since E only appears once in the word.
        </p>
      </div>
      {gameAttribute.isGameOn ? (
        <a href={gameURL}>
          <div
            className="back-to-game-button"
            disabled={!gameAttribute.isGameOn}
          >
            Back To Game
          </div>
        </a>
      ) : null}
    </div>
  );
}
