import React from 'react';
import './App.css';
import IntervalClassCounter from './components/IntervalClassCounter';
import IntervalHookCounter from './components/IntervalHookCounter';

function App() {
  return (
    <div className="App">
      <IntervalClassCounter />
      <IntervalHookCounter />
    </div>
  );
}


export default App;
