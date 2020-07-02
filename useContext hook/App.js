import React from 'react';
import './App.css';
import ComponentC from './components/ComponentC';

export const UserContext = React.createContext()
export const OrganizationContext = React.createContext()

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'Elon'}>
        <OrganizationContext.Provider value={'SpaceX'}>
          <ComponentC />
        </OrganizationContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
