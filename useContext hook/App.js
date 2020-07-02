import React from 'react';
import './App.css';
import ComponentC from './components/ComponentC';

export const UserContext = React.createContext()

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'Adam'}>
        <ComponentC />
      </UserContext.Provider>
    </div>
  );
}

export default App;
