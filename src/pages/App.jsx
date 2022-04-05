import React, { useState } from "react";
import NaviBar from "../components/NaviBar";
import DifficultyBox from "../components/DifficultyBox";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <DifficultyBox />
    </div>
  );
}

export default App;
