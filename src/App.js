import React, { Component, useEffect, useState } from 'react';
import './App.scss';
import Dice from './Components/Dice/Dice'
import Header from './Components/Header/Header'
import Skills from './Components/Skills/Skills'
import Bag from './Components/Bag/Bag'

class App extends Component {

  constructor() {
    super();
    this.state = {
      bag: [{
        id: 1,
        name: "MockSet 1",
        dice: {
          d4: { material: 'metal', color: '0x7925a1', special: false },
          d6: { material: 'metal', color: '0x7925a1', special: false },
          d8: { material: 'metal', color: '0x7925a1', special: false },
          d10: { material: 'metal', color: '0x7925a1', special: false },
          d12: { material: 'metal', color: '0x7925a1', special: false },
          d20: { material: 'metal', color: '0x7925a1', special: false },
          d100: { material: 'metal', color: '0x7925a1', special: false },
        }
      }, {
        id: 2,
        name: "MockSet 2",
        dice: {
          d4: { material: 'synthwave', color: '0x7925a1', special: true },
          d6: { material: 'synthwave', color: '0x7925a1', special: true },
          d8: { material: 'synthwave', color: '0x7925a1', special: true },
          d10: { material: 'synthwave', color: '0x7925a1', special: true },
          d12: { material: 'synthwave', color: '0x7925a1', special: true },
          d20: { material: 'synthwave', color: '0x7925a1', special: true },
          d100: { material: 'synthwave', color: '0x7925a1', special: true },
        }
      }]
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3300/bag')
    .then(res => res.json()).then(result => {
      this.setState({ bag: result });
    }).catch(err =>{ console.log({ err }); })
  }

  render() {
    return (
      <div className="App">
          {/* <Dice dice={bag[0]}/>  */}
          <Bag bag={this.state.bag}/>
          {/* <Skills /> */}
      </div>
    );
  }
}

export default App;
