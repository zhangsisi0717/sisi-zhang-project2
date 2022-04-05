import React from "react";
import "./InputHistory.css";

export default function InputHistory() {
  return (
    <div className="input-outer-container">
      <div className="input-field">
        <input className="userInput" />
        <button className="submit-button">submit</button>
      </div>
    </div>
  );
}
