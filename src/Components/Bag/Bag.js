import React, { Component } from "react";
import Customizer from '../Customizer/Customizer';
import "./Bag.scss";

const bag = [
  { id: 1, name: 'my dice 1' },
  { id: 2, name: 'my dice 2' }
]

class Bag extends Component {
  componentDidMount() {
  }

  state = {
    bag: [
      { id: 1, name: 'my dice 1' },
      { id: 2, name: 'my dice 2' }
    ],
    selectedBag: bag[0]
  }

  setChooser = (id) => {
    let [choice] = this.state.bag.filter(set => set.id === id);
    console.log({ choice });
    this.setState({ selectedBag: choice })
    console.log( this.state );
  }


  render() {
    return (
      <div className='grid'>
        <div className='panel'>
        <button>Profile Setup</button>
          {bag.map(set => (
            <button key={`set-${set.id}`} onClick={() => this.setChooser(set.id)}>{set.name}</button>
          ))}
        </div>
        {/* <div className='main'>
          <input value='username'></input>
          <button>Sign In</button>
          <input value='username'></input>
          <button>Create User</button>
        </div> */}
        <div className='main'>
          <Customizer 
            set={this.state.selectedBag}
          />
        </div>
      </div>
    );
  }
}

export default Bag;