import { hideLoading, showLoading } from "react-redux-loading-bar";

import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveTweets } from "./tweets";
import { receiveUsers } from "./users";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
