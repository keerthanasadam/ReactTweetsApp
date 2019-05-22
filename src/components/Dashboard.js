import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";
export class Dashboard extends Component {
  render() {
    console.log(this.props.tweetIds);
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIds.map(id => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets).sort((a, b) => b.timeStamp - a.timeStamp)
  };
}
export default connect(mapStateToProps)(Dashboard);
