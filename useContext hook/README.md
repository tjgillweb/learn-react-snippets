# React Context

To learn more about Context API, you can refer to the context section in this repository. 

![](../context/img/context.png)

We will be using the same example, and our goal is to pass the username prop from App component and read that prop in component F using context.

There are three steps to implement when making use of context:
1. Create the context
2. Provide this context with a value and the provider must wrap the children components for the value to be available.
3. Consume the context value(in ComponentF). So, export the context from App.js

#### App.js
```Javascript
import React from 'react';
import './App.css';
import ComponentC from './components/ComponentC';

export const UserContext = React.createContext()

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'Elon'}>
        <ComponentC />
      </UserContext.Provider>
    </div>
  );
}

export default App;
```

#### ComponentC.js
```Javascript
import React from 'react';
import ComponentE from './ComponentE'

const ComponentC = () => {
    return ( 
        <div>
            <ComponentE />
        </div>
     );
}
 
export default ComponentC;
```

#### ComponentE.js
```Javascript
import React from 'react';
import ComponentF from './ComponentF';

const ComponentE = () => {
    return ( 
        <div>
            <ComponentF />
        </div>
     );
}
 
export default ComponentE;
```

#### ComponentF.js
```Javascript
import React from 'react';
import { UserContext } from '../App'

const ComponentF = () => {
    return ( 
        <div>
            <UserContext.Consumer>
                {
                    user => {
                        return <div>User context value {user}</div>
                    }
                }
            </UserContext.Consumer>
        </div>
     );
}
 
export default ComponentF;
```

- If we now take a look at the browser we see User context value Elon on the screen.
- The value being passed from the Provider is being consumed using the **Render Props Pattern** in the required component.
- Right now the way we consume the context is quite verbose than we would like it to be. Things get worse when we have to consume multiple context values.

### Consuming multiple context values 
- For example, lets say we create another context OrganizationContext

#### App.js
```Javascript
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
```

#### ComponentF.js
```Javascript
import React from 'react';
import { UserContext, OrganizationContext } from '../App'

const ComponentF = () => {
    return ( 
        <div>
            <UserContext.Consumer>
                {
                    user => {
                        return (
                            <OrganizationContext.Consumer>
                                {
                                    organization => {
                                        return (
                                            <div>
                                                <h2>User context value {user}</h2>
                                                <h3>Organization context value {organization}</h3>
                                            </div>
                                        )
                                    }
                                }
                            </OrganizationContext.Consumer>
                        )
                    }
                }
            </UserContext.Consumer>
        </div>
     );
}
 
export default ComponentF;
```

- If we now look at the browser, we can see both the context values user context value Elon and organization context value SpaceX.
- So, the code works, but its not definitely the most readable code. ***Just to consume two values, there is so much of nesting***.That's where useContext hook comes to the resue.
- The useContext hook lets you consume multiple context values in a more simpler way.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## useContext Hook
- With useContext, the first two steps of creating a context and providing a context value remain the same.
- The useContext hook only makes the consumption of the context value simpler.
- For useContext lets consume the context value in ComponentE instead of ComponentF.

There are three simple steps to consume a context value: 
1. Import useContext from React.
2. Import the necessary context.
3. Call the useContext function passing in the context as its argument. The useContext returns the context value.

We can really appreciate how much useContext simplifies context consumption when you have seen how the code used to be without using useContext hook.

#### ComponentE.js
```Javascript
import React, { useContext } from 'react';
import ComponentF from './ComponentF';
import { UserContext, OrganizationContext } from '../App'

const ComponentE = () => {
    const user = useContext(UserContext)
    const organization = useContext(OrganizationContext)
    return ( 
        <div>
            {user} - {organization}
        </div>
     );
}
 
export default ComponentE;
```

