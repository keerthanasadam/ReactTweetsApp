import { combineReducers } from "redux";

import authedUser from "./authedUser";
import tweets from "./tweets";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";
export default combineReducers({
  tweets,
  users,
  authedUser,
  loadingBar: loadingBarReducer
});
