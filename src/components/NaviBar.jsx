import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./NaviBar.css";

export default function NaviBar() {
  return (
    <div className="navi-bar">
      <div className="wordle">Wordle</div>

      <Link to={"/home"}>
        <button className="home-button">Home</button>
      </Link>
      <Link to={"/rule"}>
        <button className="rule-button">Rule</button>
      </Link>
    </div>
  );
}
