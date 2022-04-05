import React from "react";
import NaviBar from "../components/NaviBar";
import { useParams } from "react-router";
import "./Game.css";
import InputHistory from "../components/InputHistory";

export default function Game() {
  const pathParams = useParams();
  const difficulty = pathParams.difficulty;

  return (
    <div>
      <div className="diffIndicator">
        <div>Level: {difficulty}</div>
        <div>Attempts Left: 5</div>
      </div>
      <InputHistory />
    </div>
  );
}
