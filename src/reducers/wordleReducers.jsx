import { act } from "react-dom/test-utils";
import { combineReducers } from "redux";

/** 
 * 
 * 
 * const initState = {
  message: "",
  historyInput: [],
  numAttempts: 0,
  isGameOn: false,
  gameDifficulty: null,
  answer: null,
};
*/

// function messageReducer(state = initState, action) {
//   if (action.type === "CHANGE_MESSAGE") {
//     let copyState = {
//       ...state,
//       historyInput: [...state.historyInput],
//       message: action.value,
//     };
//     console.log("change message called");
//     return copyState;
//   }

//   if (action.type === "RESET") {
//     return initState;
//   }
//   return state;
// }

function messageReducer(state = "", action) {
  if (action.type === "CHANGE_MESSAGE") {
    return action.value;
  }

  if (action.type === "RESET") {
    return "";
  }
  return state;
}

// function historyReducer(state = initState, action) {
//   console.log("add to history called");
//   console.log(action);
//   if (action.type === "ADD_TO_HISTORY") {
//     let copyState = {
//       historyInput: [...state.historyInput],
//     };
//     copyState.historyInput.push(action.value);
//     return copyState;
//   }

//   if (action.type === "RESET") {
//     return initState;
//   }

//   return state;
// }

function historyReducer(state = [], action) {
  console.log("add to history called");
  console.log(action);
  if (action.type === "ADD_TO_HISTORY") {
    let copyState = [...state];
    copyState.push(action.value);
    return copyState;
  }

  if (action.type === "RESET") {
    return [];
  }
  return state;
}

// function attemptsReducer(state = initState, action) {
//   console.log("attemptsReducer called");
//   if (action.type === "ADD_ONE_ATTEMPT") {
//     let copyState = {
//       ...state,
//       historyInput: [...state.historyInput],
//       numAttempts: state.numAttempts + 1,
//     };
//     return copyState;
//   }

//   if (action.type === "RESET") {
//     return initState;
//   }

//   return state;
// }

function attemptsReducer(state = 0, action) {
  console.log("attemptsReducer called");
  if (action.type === "ADD_ONE_ATTEMPT") {
    return state + 1;
  }

  if (action.type === "RESET") {
    return 0;
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

  if (action.type === "RESET") {
    return { isGameOn: false, gameDifficulty: null, answer: null };
  }

  return state;
}

// function setInitGameAttribute(state = initState, action) {
//   console.log("setInitGameAttribute called");
//   if (action.type === "SET_GAME_ON") {
//     let word = genTargetWord(action.value);
//     return {
//       message: "",
//       historyInput: [],
//       numAttempts: 0,
//       isGameOn: true,
//       gameDifficulty: action.value,
//       answer: word,
//     };
//   }

//   if (action.type === "RESET") {
//     return initState;
//   }

//   return state;
// }

export default combineReducers({
  getMessage: messageReducer,
  getHistory: historyReducer,
  getAttempts: attemptsReducer,
  getGameAttribute: setGameAttribute,
});
