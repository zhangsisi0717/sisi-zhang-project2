import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import Rule from "./pages/Rule";
import Game from "./pages/Game";
import NaviBar from "./components/NaviBar";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import DifficultyBox from "./components/DifficultyBox";

// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import App from "./component/App";
// import combineReducers from "./reducers/calReducer";

ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <NaviBar />
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/rule" element={<Rule />} />
      <Route path="/game/:difficulty" element={<Game />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// <Route path="/game/:difficulty?" element={<Game />} />
