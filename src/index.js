import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Rule from "./pages/Rule";
import Game from "./pages/Game";
import NaviBar from "./components/NaviBar";
import DifficultyBox from "./components/DifficultyBox";
import combineReducers from "./reducers/wordleReducers";

// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import App from "./component/App";
// import combineReducers from "./reducers/calReducer";

// ReactDOM.render(<App />, document.getElementById("root"));
const store = createStore(combineReducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NaviBar />
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/rule" element={<Rule />} />

        <Route path="/game/:difficulty" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// <Route path="/game/:difficulty?" element={<Game />} />
