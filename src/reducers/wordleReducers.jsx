import { combineReducers } from "redux";
// const initState = {
//   historyInput: [],
//   isGameOn: false,
//   targetWordLength: null,
//   totalAttempt: 0,
//   message: "This is the init message",
// };

// function addToHistory(state=initState,)

function messageReducer(state = "init message", action) {
  if (action.type === "CHANGE_MESSAGE") {
    console.log("change message called");
    return action.value;
  }
  return state;
}

function historyReducer(state = [], action) {
  console.log("add to history called");
  if (action.type === "ADD_TO_HISTORY") {
    const newHistory = [...state];
    newHistory.push(action.value);
    console.log(newHistory);
    return newHistory;
  }
  if (action.type === "CLEAR_HISTORY") {
    return [];
  }
  return state;
}

function attemptsReducer(state = 0, action) {
  if (action.type === "ADD_ONE_ATTEMPT") {
    return state + 1;
  }

  if (action.type === "RESET_ATTEMPT") {
    return 0;
  }
  return state;
}

export default combineReducers({
  getMessage: messageReducer,
  getHistory: historyReducer,
  getAttempts: attemptsReducer,
});
