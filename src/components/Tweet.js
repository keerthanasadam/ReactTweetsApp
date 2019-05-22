import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "./../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";

import { handleToggleTweet } from "./../actions/tweets";
import { Link, withRouter } from "react-router-dom";

export class Tweet extends Component {
  toParent(e, id) {
    e.preventDefault();
    // Redirect to parent tweet
    this.props.history.push(`/tweet/${id}`);
  }

  handleLike = e => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser
      })
    );
  };

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
      <Link className="tweet" to={`/tweet/${id}`}>
        <img src={avatar} className="avatar" alt="User Avatar" />
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
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet));
