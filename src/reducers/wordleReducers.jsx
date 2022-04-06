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

function isGameOn(state = false, action) {
  if (action.type === "SET_GAME_ON") {
    return true;
  }

  if (action.type === "SET_GAME_OFF") {
    return false;
  }

  return state;
}

function setGameDifficulty(state = null, action) {
  if (action.type === "SET_GAME_DIFFICULTY") {
    return action.value;
  }
  return state;
}

function genTargetWord(difficulty) {
  if (difficulty === "easy") {
    return "apple";
  } else if (difficulty === "medium") {
    return "eleven";
  } else {
    return "jazzman";
  }
}

function setGameAttribute(
  state = { isGameOn: false, gameDifficulty: null, answer: null },
  action
) {
  if (action.type === "SET_GAME_ON") {
    let word = genTargetWord(action.value);
    return {
      isGameOn: true,
      gameDifficulty: action.value,
      answer: word,
    };
  }

  return state;
}

export default combineReducers({
  getMessage: messageReducer,
  getHistory: historyReducer,
  getAttempts: attemptsReducer,
  getGameDifficulty: setGameDifficulty,
  isGameOn: isGameOn,
  getGameAttribute: setGameAttribute,
});
