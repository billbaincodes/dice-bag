import React, { Component } from "react";
import "./Skills.scss";

class Skills extends Component {

  state = {
    view: 'STR',
    modifiers: {
      STR: 0,
      DEX: 0,
      CON: 0,
      WIS: 0,
      INT: 0,
      CHA: 0,
      ATK: 0,
      DMG: 0,
      profBonus: 2,
      mods: {
        athletics: { 
          prof: false,
          other: 0,
        },
        acrobatics: { 
          prof: false,
          other: 0,
        },
        sleight: { 
          prof: false,
          other: 0,
        },
        stealth: { 
          prof: false,
          other: 0,
        },
        animal: { 
          prof: false,
          other: 0,
        },
        insight: { 
          prof: false,
          other: 0,
        },
        medicine: { 
          prof: false,
          other: 0,
        },
        perception: { 
          prof: false,
          other: 0,
        },
        survival: { 
          prof: false,
          other: 0,
        },
        arcana: { 
          prof: false,
          other: 0,
        },
        history: { 
          prof: false,
          other: 0,
        },
        investigation: { 
          prof: false,
          other: 0,
        },
        nature: { 
          prof: false,
          other: 0,
        },
        religion: { 
          prof: false,
          other: 0,
        },
        deception: { 
          prof: false,
          other: 0,
        },
        intimidation: { 
          prof: false,
          other: 0,
        },
        performance: { 
          prof: false,
          other: 0,
        },
        persuasion: { 
          prof: false,
          other: 0,
        },
        attack: { 
          prof: false,
          other: 0,
        },
        initiative: { 
          prof: false,
          other: 0,
        },
      },
    },
  }

  roll = (check) => {
    let value = Math.ceil(Math.random() * 20);
    let mods = this.state.modifiers.mods[check]
    let prof = mods.prof || this.state.modifiers.prof
    return value + prof + mods
  }

  renderSwitch = (view) => {
    switch(view) {
      case 'CON':
        return (
          <div className='ability-list'>
            <button>Constitution Check</button>
          </div>
        );
      case 'STR':
        return (
          <div className='ability-list'>
            <button>Strength Check</button>
            <button>Athletics</button>
          </div>
        );
      case 'DEX':
        return (
          <div className='ability-list'>
            <button>Dexterity Check</button>
            <button>Acrobatics</button>
            <button>Sleight of Hand</button>
            <button>Stealth</button>
          </div>
        );
      case 'WIS':
        return (
          <div className='ability-list'>
            <button>Wisdom Check</button>
            <button>Animal Handling </button>
            <button>Insight </button>
            <button>Medicine </button>
            <button>Perception </button>
            <button>Survival</button>
          </div>
        );
      case 'INT':
        return (
          <div className='ability-list'>
            <button>Intelligence Check</button>
            <button>Arcana</button>
            <button>History</button>
            <button>Investigation</button>
            <button>Nature</button>
            <button>Religion</button>
          </div>
        );
      case 'CHA':
        return (
          <div className='ability-list'>
            <button>Charisma Check</button>
            <button>Deception</button>
            <button>Intimidation</button>
            <button>Performance</button>
            <button>Persuasion</button>
          </div>
        );
      case 'misc':
        return (
          <div className='ability-list'>
            <button>Attack</button>
            <button>Damage</button>
            <button>Initiative</button>
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
          <div 
            className={this.state.view === 'STR' ? 'selected' : ''}
            onClick={() => this.setState({view: 'STR'})}>STRENGTH
          </div>
          <div 
            className={this.state.view === 'DEX' ? 'selected' : ''}
            onClick={() => this.setState({view: 'DEX'})}>
            DEXTERITY
          </div>
          <div 
            className={this.state.view === 'CON' ? 'selected' : ''}
            onClick={() => this.setState({view: 'CON'})}>
            CONSTITUTION
          </div>
          <div 
            className={this.state.view === 'WIS' ? 'selected' : ''}
            onClick={() => this.setState({view: 'WIS'})}>
            WISDOM
          </div>
          <div 
            className={this.state.view === 'INT' ? 'selected' : ''}
            onClick={() => this.setState({view: 'INT'})}>
            INTELLIGENCE
          </div>
          <div 
            className={this.state.view === 'CHA' ? 'selected' : ''}
            onClick={() => this.setState({view: 'CHA'})}>
            CHARISMA
            </div>
          <div 
            className={this.state.view === 'misc' ? 'selected' : ''}
            onClick={() => this.setState({view: 'misc'})}>
            Miscellaneous
          </div>
        </div>
        <div>
          {this.renderSwitch(this.state.view)}
        </div>
      </div>
    );
  }
};

export default Skills;
