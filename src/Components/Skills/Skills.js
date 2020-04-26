import React, { Component } from "react";
import "./Skills.scss";

class Skills extends Component {

  state = {
    view: 'STR',
  }

  renderSwitch = (view) => {
    switch(view) {
      case 'STR':
        return (
          <div className='ability-list'>
            <span>Saving Throw</span>
            <span>Athletics</span>
          </div>
        );
      case 'DEX':
        return (
          <div className='ability-list'>
            <button>Acrobtics</button>
            <button>Sleight of Hand</button>
            <button>Stealth</button>
          </div>
        );
      case 'WIS':
        return (
          <div className='ability-list'>
            <button>  Animal Handling </button>
            <button>  Insight </button>
            <button>  Medicine </button>
            <button>  Perception </button>
            <button>  Survival</button>
          </div>
        );
      default:
        return 'foo';
    }
  }

  render(){
    return (
      <div className='container'>
                <div className='tabs'>
            <div>STR</div>
            <div onClick={() => this.setState({view: 'DEX'})}>DEX</div>
            <div>CON</div>
            <div onClick={() => this.setState({view: 'WIS'})}>WIS</div>
            <div>INT</div>
            <div>CHA</div>
            <div>Misc</div>
          </div>
        <div className='block'>
            {this.renderSwitch(this.state.view)}
        </div>
      </div>
    );
  }
};

export default Skills;
