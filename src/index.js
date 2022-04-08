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

const saveState = (state) => {
  try {
    // Convert the state to a JSON string
    const serialisedState = JSON.stringify(state);

    // Save the serialised state to localStorage against the key 'app_state'
    window.localStorage.setItem("wordle_game_state", serialisedState);
  } catch (err) {
    console.log("error saving the state to local store:");
    console.log(err);
  }
};

const loadState = () => {
  try {
    // Load the data saved in localStorage, against the key 'app_state';
    const serialisedState = window.localStorage.getItem("wordle_game_state");

    // Passing undefined to createStore will result in our app getting the default state
    // If no data is saved, return undefined
    if (!serialisedState) return undefined;

    // De-serialise the saved state, and return it.
    return JSON.parse(serialisedState);
  } catch (err) {
    console.log("error loading state from local store:");
    console.log(err);
    return undefined;
  }
};

/**
 * This is where you create the app store
 */
const oldState = loadState();

const store = createStore(combineReducers, oldState);

store.subscribe(() => {
  saveState(store.getState());
});

// const store = createStore(combineReducers);
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
