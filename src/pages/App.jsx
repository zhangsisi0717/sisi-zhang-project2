import React, { useState } from "react";
import NaviBar from "../components/NaviBar";
import DifficultyBox from "../components/DifficultyBox";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NaviBar />
      <DifficultyBox />
    </div>
  );
}

export default App;
