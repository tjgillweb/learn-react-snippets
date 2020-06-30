import React from 'react';
import './App.css';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <User render={ (isLoggedIn) => isLoggedIn ? 'Elon' : 'Guest' }/>
    </div>
  );
}

export default App;
