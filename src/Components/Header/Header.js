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
        <Navbar.Brand href="#home">Dice Bag 0.3</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <button onClick={() => this.props.setSpeed()}>Faster!</button>
            <div class='color-set d-flex'>
              <label htmlFor="color-set">Choose Color: </label>
              <input onChange={(e) => this.props.colorSet(e)}
                id="color-set"
                type="color">
              </input>
            </div>
            <NavDropdown onSelect={(e) => this.props.changeMaterial(e)} title="Materials" id="basic-nav-dropdown">
              <NavDropdown.Item href='#action/basic'>Plastic</NavDropdown.Item>
              <NavDropdown.Item href="#action/wood" value='wood'>Wood</NavDropdown.Item>
              <NavDropdown.Item href="#action/metal">Metal</NavDropdown.Item>
              <NavDropdown.Item href="#action/star">Stars</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Special ; )&nbsp;" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Rainbow</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Synthwave</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Galaxy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="System" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => this.props.darkToggle()}>Dark Mode</NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.toggleLog()} href="#action/3.2">Roll Log</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Hide Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
