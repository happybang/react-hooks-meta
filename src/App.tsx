import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import newMain from "./main";
import {manager} from "./manager";
let a = newMain;
const App: React.FC = () => {
  const [loading, person] =manager.getInstance().getDataType("usePerson")("31232131");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <p>You're viewing: {(person as any).name}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
