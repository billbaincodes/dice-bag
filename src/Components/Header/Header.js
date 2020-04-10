import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  state = {
    darkMode: false,
  };

  render() {
    return (
      <header className={this.state.darkMode ? "light" : "dark"}>
        ⏣ become one with inner selfness ⏣
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.colorRandomizer()}
        >
          Random Color!
        </button>
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.setSpeed()}
        >
          Faster!!
        </button>
        <label htmlFor="color-set">Choose Color: </label>
        <input
          onChange={(e) => this.props.colorSet(e)}
          id="color-set"
          type="color"
        ></input>
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.colorSynth()}
        >
          s y n t h w a v e
        </button>
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.darkToggle()}
        >
          {this.state.darkMode ? "Light" : "Dark"} Mode
        </button>
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.batterySaver()}
        >
          Battery Saver
        </button>
        <button onClick={() => this.props.colorRainbow()}></button>
        <span onClick={() => this.props.toggleSettings()}>
          <i className="settings fas fa-cog"></i>
        </span>
      </header>
    );
  }
}

export default Header;
