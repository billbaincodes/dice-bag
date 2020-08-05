import React, { Component } from "react";
import "./Bag.scss";

const sets = [
  { name: 'my dice 1' },
  { name: 'my dice 2' }
]

class Bag extends Component {
  componentDidMount() {
  }


  render() {
    return (
      <div class='grid'>
        <div class='panel'>
          {sets.map(set => (
            <div>{set.name}</div>
          ))}
        </div>
        <div class='main'>
        <input value={sets[0].name}></input>
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

export default Bag;