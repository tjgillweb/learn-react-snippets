# Higher Order Components
- HOC is a pattern where a function accepts a component as an argument and returns a new(enhanced) component.
``` const NewComponent = higherOrderComponent(originalComponent)```
- HOC adds additional data or functionality to the originalComponent so that the NewComponent can also be referred as Enhanced Component.
``` const EnhancedComponent = higherOrderComponent(originalComponent)```
- The HOC pattern is used to share common functionality between components without having to repeat the code.

We have 2 components that share common functionality of incrementCount(as you can see below).

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
#### HOC withCounter.js (basic structure of a HOC)
```Javascript
import React from 'react';

const UpdatedComponent = (OriginalComponent) => {
        render() {
            return <OriginalComponent />
        }
    }
    return NewComponent
}
export default UpdatedComponent
```
- To avoid the duplication of remove the constructor and incrementCount method from both ClickCounter and HoverCounter components.
- We will create a HOC to avoid the repetion of code and instead reuse the code.
- Now in the HOC, we need to pass down the state and the incrementCount method as props so that the OriginalComponent can make use of that functionality.

#### withCounter.js
```Javascript 
import React from 'react';

const UpdatedComponent = (OriginalComponent) => {
        class NewComponent extends React.Component {
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
                <OriginalComponent 
                    count={this.state.count} 
                    incrementCount={this.incrementCount} 
                />
            )
        }
    }
    return NewComponent
}

export default UpdatedComponent
```
### Execution Flow of HOC
- The UpdatedComponent is a function which accepts OriginalComponent as its parameter and returns a NewComponent. 
- In our case, the OriginalComponent refers to the ClickCounter.
- The NewComponent has functionality to maintain the state of a count property and also a method to increment that count property. Both of them are passed as props to the OriginalComponent.
- The OriginalComponent enhanced with these props are then returned. 
- The control goes back to ClickCounter where the count and incrementCount props passed in from the HOC are destructured and used in the return statement. 
- So, HOC is basically taking care of maintaining the state and incrementing it.
- **NOTE:** Both the components ClickCounter and HoverCounter receive separate states. So, incrementing the count in ClickCounter will not affect the count in HoverCounter and vice-versa.

### Naming Convention
- replace UpdatedComponent with withCounter.js
- replace OriginalComponent with WrappedComponent
- replace NewComponent with WithCounter(pascal case) (usually the function name)

So, the updated code looks like :

#### withCounter.js
```Javascript
import React from 'react';

const withCounter = (WrappedComponent) => {
        class WithCounter extends React.Component {
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
                <WrappedComponent 
                    count={this.state.count} 
                    incrementCount={this.incrementCount} 
                />
            )
        }
    }
    return WithCounter
}

export default withCounter
```

#### ClickCounter.js
```Javascript
import React, { Component } from 'react';
import withCounter from './withCounter';

class ClickCounter extends Component {
    
    render() { 
        const { count, incrementCount } = this.props
        return ( 
            <button onClick={incrementCount}> Clicked {count} times</button>
         );
    }
}
 
export default withCounter(ClickCounter);
```

#### HoverCounter.js
```Javascript
import React, { Component } from 'react';
import withCounter from './withCounter';

class HoverCounter extends Component {
    
    render() { 
        const { count, incrementCount } = this.props
        return ( 
            <h2 onMouseOver={incrementCount}>{this.props.name} Hovered {count} times</h2>
         );
    }
}
 
export default withCounter(HoverCounter);
```

#### App.js
```Javascript
import React from 'react';
import './App.css';
import ClickCounter from './components/ClickCounter';
import HoverCounter from './components/HoverCounter';

function App() {
  return (
    <div className="App">
      <ClickCounter />
      <HoverCounter />
    </div>
  );
}

export default App;

```
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Passing Down Props in HOC
- If you pass down a prop from App.js, the prop is passed down to the HOC but not to the component that is wrapped.
- ***When you create HOC's, it is important to pass down the rest of the props(using spread operator)***.
- To demonstrate, let's pass a 'name' prop on the Click Counter Component(in App.js)   
```Javascript
<div className="App">
  <ClickCounter name='Elon' />
  <HoverCounter />
</div>
```
- In ClickCounter, we will render the name prop
```Javascript
render(){
....
    <button onClick={incrementCount}>{this.props.name} Clicked {count} times</button>
...
```

- If we check the browser, the name 'Elon' is not displayed. And this is a common mistake that happenss when you start off with HOC's.
- The problem is when we specify props on the ClickCounter component, the props are sent down to HOC and not to ClickCounter.
- If we `console.log(this.props.name)` in the HOC render method, we can see the name in the console for the ClickCounter, and undefined for HoverCounter.

- To fix this issue, we need to pass down the remaining props to the WrappedComponent using the spread operator.
- So, the HOC adds two props to the WrappedComponent(count and incrementCount) and then simply passes down whatever remaining props have been specified.
```Javascript
render() {
    console.log(this.props.name);
    return (
        <WrappedComponent 
            count={this.state.count} 
            incrementCount={this.incrementCount} 
            {...this.props}
        />
    )
}
```

## Passing Parameters to the HOC
- In our HOC, let's say instead of incrementing the count value by 1, we want to increment it by different numbers for both the components(ClickCounter and HoverCounter).
- We can do that by passing a parameter to the HOC function.
- So, the arrow function will no have two parameters: the first one is WrappedComponent, and the second one `incrementNumber`.
- Then, instead of incrementing the count by 1, we will increment it by `incrementNumber`.
- And then pass a second argument of 5 in the ClickCounter and 10 in the HoverCounter.
```Javascript
    export default withCounter(ClickCounter, 5);
    export default withCounter(HoverCounter, 10);
```
- Now when we click, increment is in the multiples of 5, and when we hover, increment is in the multiples of 10.

#### withCounter.js
```Javascript
const withCounter = (WrappedComponent, incrementNumber) => {
    class WithCounter extends React.Component {
        constructor(props) {
            ...
        }

        incrementCount = () => {
            this.setState(prevState => {
                return { count: prevState.count + incrementNumber }
            })
        }
        ...
    }
}
```
