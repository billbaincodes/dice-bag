import React, { Component } from "react";
import "./RollLog.scss";

class RollLog extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="log">
      <i className='close' onClick={() => {this.props.toggleLog()}}>x</i>
        <h2>Roll Log:</h2>
        {this.props.rolls.map((roll, idx) => (
          <div key={`roll-${idx}`} className='my-row'>
            <span>{roll.date}</span>
            <div className='roll-value'>
              <div>{roll.roll}</div>
              <div className='total'> /{roll.die}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RollLog;
