import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  state = {
    darkMode: false,
  };

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

// <header className={this.state.darkMode ? "light" : "dark"}>
// <button
//   className={this.state.darkMode ? "light" : "dark"}
//   onClick={() => this.props.toggleLog()}
// >
//   Roll Log
// </button>
// <button
//   className={this.state.darkMode ? "light" : "dark"}
//   onClick={() => this.props.colorRandomizer()}
// >
//   Random Color!
// </button>
// <button
//   className={this.state.darkMode ? "light" : "dark"}
//   onClick={() => this.props.setSpeed()}
// >
//   Faster!!
// </button>
// <label htmlFor="color-set">Choose Color: </label>
// <input
//   onChange={(e) => this.props.colorSet(e)}
//   id="color-set"
//   type="color"
// ></input>
// <div class="dropdown">
//   <button class="dropbtn">Dropdown</button>
//   <div class="dropdown-content">
//     <button
//     className={this.state.darkMode ? "light" : "dark"}
//     onClick={() => this.props.colorSynth()}
//     >
//       s y n t h w a v e
//     </button>
//     <button
//     className={this.state.darkMode ? "light" : "dark"}
//     onClick={() => this.props.colorSynth()}
//     >
//       Rainbow
//     </button>
//     <button
//     className={this.state.darkMode ? "light" : "dark"}
//     onClick={() => this.props.colorSynth()}
//     >
//       Tron
//     </button>
//   </div>
// </div>
// <button
//   className={this.state.darkMode ? "light" : "dark"}
//   onClick={() => this.props.darkToggle()}
// >
//   {this.state.darkMode ? "Light" : "Dark"} Mode
// </button>
// <button
//   className={this.state.darkMode ? "light" : "dark"}
//   onClick={() => this.props.batterySaver()}
// >
//   Battery Saver
// </button>
// <button onClick={() => this.props.colorRainbow()}></button>
// <span onClick={() => this.props.toggleSettings()}>
//   <i className="close-cog fas fa-cog"></i>
// </span>
// </header>
