import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "./../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";

export class Tweet extends Component {
  toParent(e, id) {
    e.preventDefault();
    // Redirect to parent tweet
  }

  hadleLikes(e, id) {
    e.preventDefault();
  }
  render() {
    const {
      name,
      text,
      avatar,
      hasLiked,
      parent,
      timestamp,
      likes,
      replies,
      id
    } = this.props.tweet;
    return (
      <div className="tweet">
        <img src={avatar} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            <div>
              {parent && (
                <button
                  className="replying-to"
                  onClick={e => this.toParent(e, parent.id)}
                >
                  Replying to @ {parent.author}
                </button>
              )}
            </div>
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button
              className="heart-button"
              onClick={e => this.handleLikes(e, id)}
            >
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
    authedUser
  };
}

export default connect(mapStateToProps)(Tweet);
