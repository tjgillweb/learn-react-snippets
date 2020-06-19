# useState Hook

### Class component example using setState
#### App.js
```javascript
import React from 'react';
import './App.css';
import ClassCounter from './components/ClassCounter';
import HookCounter from './components/HookCounter';

function App() {
  return (
    <div className="App">
      <ClassCounter />
      <HookCounter />
    </div>
  );
}

export default App;
```

#### ClassCounter.js
```Javascript
import React, { Component } from 'react';

class ClassCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }

    incrementCount = () => {
        this.setState({count: this.state.count + 1})
    }

    render() { 
        return ( 
            <div>
            <button onClick={this.incrementCount}>Count {this.state.count}</button>
            </div>
         );
    }
}
export default ClassCounter;
```

### Functional Component using React Hook useState(Implementing the same logic)
#### HookCounter.js
```javascript
import React, {useState} from 'react';

const HookCounter = () => {
    const [count, setCount] = React.useState(0);
    const incrementCount = () => setCount(count + 1);
    return (
        <div>
            <button onClick={incrementCount}>Count {count}</button>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    )
}
export default HookCounter;
```
### useState with previous state
If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:
```javascript
import React, {useState} from 'react';

const HookCounterUpdated = () => {
    const initialCount = 0;
    const [count, setCount] = useState(initialCount);
    return ( 
        <div>
        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>Decrement</button>
        </div>
     );
}
 
export default HookCounterUpdated;
```
- The **Increment** and **Decrement** buttons use the **`functional form`** or "updater" form, because the updated value is based on the previous value. 
- But the **Reset** button uses the normal form, because it always sets the count back to the initial value.
- We're passing a function instead of a value. React calls that function with the previous value of the state, and whatever you return will replace the state with a new value.
- It is useful in case your update is happening in a closure which has captured an old (stale) value of the state.

- You can also update the ClassCounter.js with the functional form like so:
#### ClassCounter.js
```Javascript
import React, { Component } from 'react';

class ClassCounter extends Component {
    ...

    // incrementCount = () => {
    //     this.setState({count: this.state.count + 1})
    // }

    //Updating state based on previous state
    incrementCount = () => {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }
    
  ...
}
```

