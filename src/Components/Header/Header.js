import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  state = {
    darkMode: false,
  };

  render() {
    return (
      <header className={this.state.darkMode ? "light" : "dark"}>
        <button
          className={this.state.darkMode ? "light" : "dark"}
          onClick={() => this.props.toggleLog()}
        >
          Roll Log
        </button>
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
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <button
            className={this.state.darkMode ? "light" : "dark"}
            onClick={() => this.props.colorSynth()}
            >
              s y n t h w a v e
            </button>
            <button
            className={this.state.darkMode ? "light" : "dark"}
            onClick={() => this.props.colorSynth()}
            >
              Rainbow
            </button>
            <button
            className={this.state.darkMode ? "light" : "dark"}
            onClick={() => this.props.colorSynth()}
            >
              Tron
            </button>
          </div>
        </div>
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
          <i className="close-cog fas fa-cog"></i>
        </span>
      </header>
    );
  }
}

export default Header;
