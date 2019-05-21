import { saveLikeToggle } from "./../utils/api";
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";

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

export function handleToggleTweet(info) {
  return dispatch => {
    dispatch(toggleTweet(info));
    saveLikeToggle(info).catch(e => {
      console.warn("Error occurred while handlingToggleTweet", e);
      dispatch(toggleTweet(info));
    });
  };
}
