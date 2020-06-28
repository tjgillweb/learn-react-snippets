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
