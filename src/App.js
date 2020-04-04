import React from 'react';
import './App.scss';
import Dice from './Components/Dice/Dice'
import Header from './Components/Header/Header'

function App() {
  return (
    <div className="App">
        <Header />
        <Dice />
    </div>
  );
}

export default App;
