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
            <div>Saving Throw</div>
            <div>Athletics</div>
          </div>
        );
      default:
        return 'foo';
    }
  }

  render(){
    return (
      <div className='container'>
        <div className='block'>
          <div className='tabs'>
            <div>STR</div>
            <div>DEX</div>
            <div>CON</div>
            <div>WIS</div>
            <div>INT</div>
            <div>CHA</div>
            <div>Misc</div>
          </div>
        {this.renderSwitch(this.state.view)}
        </div>
      </div>
    );
  }
};

export default Skills;
