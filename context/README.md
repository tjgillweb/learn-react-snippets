# React Context
- Context provides a way to pass the data through the component tree without having to pass down manually at every level.

![](img/context.png)

- In our example, we will implement a User context which will enable a component at any level to read a prop that is passed at the top level.
- Our goal is to pass the username value from the App component and read that value in Component F using Context.

There are 3 steps to implement context:
 1. Create the context
 2. Provide a context value
 3. Consume the context value
 
#### userContext.js
```Javascript
import React from 'react';

const UserContext = React.createContext()

const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export {UserProvider, UserConsumer};
```

#### App.js
```Javascript
import React from 'react';
import './App.css';
import ComponentC from './components/ComponentC';
import {UserProvider} from './components/userContext'

function App() {
  return (
    <div className="App">
    <UserProvider value="Evan">
      <ComponentC />
    </UserProvider>
    </div>
  );
}

export default App;
```

#### ComponentC.js
```Javascript
import React, { Component } from 'react';
import ComponentE from './ComponentE';

class ComponentC extends Component {
    render() { 
        return <ComponentE />;
    }
}
 
export default ComponentC;
```

#### ComponentE.js
```Javascript
import React, { Component } from 'react';
import ComponentF from './ComponentF';

class ComponentE extends Component {
    render() { 
        return <ComponentF />;
    }
}
 
export default ComponentE;
```

#### ComponentF.js
```Javascript
import React, { Component } from 'react';
import {UserConsumer}  from './userContext'

class ComponentF extends Component {
    render() { 
        return (
            <UserConsumer>
                {
                    (username) => {
                        return <h2>Hello {username}</h2>
                    }
                }            
            </UserConsumer>
        );
    }
}
 
export default ComponentF;
```

- If we check the browser, you should be able to see the text Hello Evan displayed from component F. We have successfully used context to provide a value to a deeply nested component without having to pass that value as a prop through every intermediate component.

#### STEPS EXPLAINED:
1. ***Create the context:*** (in userContext.js) using the React.createContext method. Be sure to export the provider and consumer components as well.
2. ***Provide a context value:*** (in App.js) At the top level, include the provider component and provide a value using the value attribute. This value can now be consumed by any of the descendant components.
3. ***Consume the context value:*** (in ComponentF.js) In the component where username is required, use the Consumer Component and pass in a function as its child. The function receives the context value as its parameter which can then be used to return the desired JSX. You can choose to just display it or use it for some rendering logic.
