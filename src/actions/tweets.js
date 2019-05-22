import { saveLikeToggle, saveTweet } from "./../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const ADD_TWEET = "ADD_TWEET";

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

function toggleTweet({ id, hasLiked, authedUser }) {
  return {
    type: TOGGLE_LIKE,
    id,
    hasLiked,
    authedUser
  };
}

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function handleToggleTweet(info) {
  return dispatch => {
    dispatch(toggleTweet(info));
    saveLikeToggle(info).catch(e => {
      console.warn("Error occurred while handlingToggleTweet", e);
      dispatch(toggleTweet(info));
    });
  };
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveTweet({ text, author: authedUser, replyingTo }).then(tweet => {
      dispatch(addTweet(tweet));
      dispatch(hideLoading());
    });
  };
}
