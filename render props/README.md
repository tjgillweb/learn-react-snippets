# Render Props
- The render props pattern just like HOC pattern helps to share common functionality between components.
- The term 'Render Props' refers to a technique for ***sharing code*** between React components using a ***prop whose value is a function***.

To understand, lets say we want to display a name='Elon' to the screen.

#### Create User.js
```Javascript
import React, { Component } from 'react';

class User extends Component {
    render() { 
        return ( 
            <div>
                {this.props.name} 
            </div>
        );
    }
}
export default User;
```
#### App.js
```Javascript
import React from 'react';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <User name='Elon'/>
    </div>
  );
}

export default App;
```
- pass a prop 'name' from User Component(in App.js) ```<User name='Elon'/>``` and render it in User.js using `{this.props.name}` 
- Now, instead of simply passing the string name='Elon' as name prop, I want to pass a function which will return the string 'Elon'  
```Javascript 
    <User name={ () => 'Elon' }/> 
```
- In User.js add parantheses to call the function `{this.props.name()}`. Its the same as before. The only difference now is that it contains a reference to a function.
- The name Elon is displayed in the browser. Everything works fine as before.
- For the next step, I want to have parameters to the function in the name prop. Based on the parameter, I want to change what is rendered by the User component. 
- So, we will pass a parameter `isLoggedIn` as a parameter and the function will return the string 'Elon' or 'Guest' based on the value of isLoggedIn.
```Javascript 
    <User name={ (isLoggedIn) => isLoggedIn ? 'Elon' : 'Guest' }/>
```
- In User.js, the name prop will accept an argument which I will pass as true/false `{this.props.name(true)}`.

- Now, in App Component, we will rename name prop to render and also change it in User Component. This is valid and does not conflict with the render lifecycle method in any way.
#### In App.js
```Javascript 
    <User render={ (isLoggedIn) => isLoggedIn ? 'Elon' : 'Guest' }/>
```
#### In User.js
```Javascript 
    render() { 
        return ( 
            <div>
                {this.props.render()} 
            </div>
        );
    }
```
> In react, it is possible to use a prop whose value is a function to control what is actually rendered by a component. This is what the Render Props pattern is based on.

- So, with the above example, we just learned how to use a prop whose value is a function. Now, lets learn how to share functionality.
- Create ClickCounter.js and HoverCounter.js in src/components with the same code as in HOC. These two components share the incrementCount functionality.
#### ClickCounter.js
```Javascript
import React, { Component } from 'react';

class ClickCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }

    incrementCount = () => {
        this.setState(prevState => {
            return { count: prevState.count +1 }
        })
    }
    render() { 
        const { count } = this.state
        return ( 
            <button onClick={this.incrementCount}>Clicked {count} times</button>
         );
    }
}
 
export default ClickCounter;
```

#### HoverCounter.js
```Javascript
import React, { Component } from 'react';

class HoverCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }

    incrementCount = () => {
        this.setState(prevState => {
            return { count: prevState.count +1 }
        })
    }
    render() { 
        const { count } = this.state
        return ( 
            <h2 onMouseOver={this.incrementCount}>Hovered {count} times</h2>
         );
    }
}
 
export default HoverCounter;
```
- Now create a Counter component which will be our container component where we implement the common functionality i.e. the state along with the incrementCount method.
- Pull out the constructor with state and the incrementCount method from ClickCounter and HoverCounter components and paste it in Counter.js.
- In JSX inside Counter.js, render prop is going to control what will be rendered by the Counter component.
- For our example, in JSX we will pass down two arguments, `this.state.count` and  `this.state.incrementCount` which will render ClickCounter and HoverCounter.
- Basically, the Counter component is telling that take the count state and incrementCount method, and render whatever you want to. I will handle everything regarding Counter logic.

#### Counter.js
```Javascript
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }

    incrementCount = () => {
        this.setState(prevState => {
            return { count: prevState.count +1 }
        })
    }
    render() {         
        return ( 
            <div>
                {this.props.render(this.state.count, this.state.incrementCount)}
            </div>
         );
    }
}
 
export default Counter;
```

#### App.js
```Javascript
import React from 'react';
import './App.css';
import ClickCounter from './components/ClickCounter';
import HoverCounter from './components/HoverCounter';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Counter 
        render={(count, incrementCount) => (
          <ClickCounter count={count} incrementCount={incrementCount} />
        )}
      />
      <Counter 
        render={(count, incrementCount) => (
          <HoverCounter count={count} incrementCount={incrementCount} />
        )}
      />
    </div>
  );
}

export default App;
```

#### ClickCounter.js
```Javascript
import React, { Component } from 'react';

class ClickCounter extends Component {
    
    render() { 
        const { count, incrementCount } = this.props
        
        return ( 
            <button onClick={incrementCount}>Clicked {count} times</button>
         );
    }
}
 
export default ClickCounter;
```

#### HoverCounter.js
```Javascript
import React, { Component } from 'react';

class HoverCounter extends Component {
    
    render() { 
        const { count, incrementCount } = this.props
        return ( 
            <h2 onMouseOver={incrementCount}>Hovered {count} times</h2>
         );
    }
}
 
export default HoverCounter;
```

***Summary:***
- In App component, we come across the Counter component. In the Counter component we have a count state and an incrementCount method.
- The Counter component does not render anything on its own. It is simply going to render whatever is passed as the render prop. And while doing so, it passes on the count state and the incrementCount method.
- Now what is a render prop? It is the ClickCounter Component. The count state and the incrementCount method from the Counter component are passed as props to the ClickCounter component.
- The ClickCounter component makes use of the passed in props to render the actual UI.
- Even though the ClickCounter and HoverCounter components share common code, the Counter component instances will be different and hence there will be no conflict between the count state values.
- **NOTE:** prop need not be called as render, it could be called anything you wish to but render is kind of the convention.

***There is also a variation of the Render Props pattern which doesn't even make use of the prop.*** Instead the children prop is used.

- Instead of render prop we pass in the function between the component opening and closing tags (in App.js).
- In Counter component, we change `this.props.render` to `this.props.children`

#### App.js
```Javascript
function App() {
  return (
    <div className="App">
      <Counter>
      {
         (count, incrementCount) => (<ClickCounter count={count} incrementCount={incrementCount} />)
      }
      </Counter>
      <Counter>
      {
         (count, incrementCount) => (<HoverCounter count={count} incrementCount={incrementCount} />)
      }
      </Counter>
    </div>
  );
}

export default App;

```
