import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "./../actions/tweets";

export class NewTweet extends Component {
  state = {
    text: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState(() => ({
      text: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;
    console.log(text);
    dispatch(handleAddTweet(text, id));
    this.setState(() => ({
      text: ""
    }));
  };

  render() {
    const { text } = this.state;
    let textLeft = 280 - text.length;
    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            className="textarea"
            onChange={this.handleChange}
            maxLength="280"
            value={text}
          />
          {textLeft <= 100 && <div className="tweet-length">{textLeft}</div>}
          <button disabled={text === ""} className="btn">
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
