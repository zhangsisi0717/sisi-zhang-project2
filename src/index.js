import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import Rule from "./pages/Rule";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import App from "./component/App";
// import combineReducers from "./reducers/calReducer";

ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/rule" element={<Rule />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
