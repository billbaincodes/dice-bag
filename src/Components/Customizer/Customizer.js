import React, { Component } from "react";
import "./Customizer.scss";

class Customizer extends Component {

  constructor(props) {
    console.log('constructing')
    super(props);
    this.state = {
      name: this.props.bag.name
    };
  }

  componentDidMount() {
    console.log(' mountin ');
    this.setState({ name: this.props.bag.name });
  }

  namer = (e) => {
    let name = e.target.value
    this.setState({ name });
  }


  render() {
    const { bag } = this.props;
    return (
      <div>
        <div class='main'>
          <h2>{bag.name}</h2>
          <div>
            <button>d4</button>
            <button>d6</button>
            <button>d8</button>
            <button>d10</button>
            <button>d12</button>
            <button>d20</button>
            <button>d100</button>
          </div>
          <div>
              <label>Material</label>
              <select>
                <option>Rainbow</option>
                <option>Tron</option>
                <option>SynthWave</option>
                <option>Custom</option>
              </select>
            </div>
          <form>
            <div>
              <label>Select a Texture</label>
              <select>
                <option>Plastic</option>
                <option>Metal</option>
                <option>Wood</option>
                <option>Star</option>
              </select>
            </div>
            <div class='color-set d-flex'>
              <label htmlFor="color-set">Choose Color: </label>
              <input
                id="color-set"
                type="color">
              </input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Customizer;