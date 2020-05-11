import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
  state = {
    darkMode: false,
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
