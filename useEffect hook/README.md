# useEffect Hook
- The useEffect hook lets you perform side effects in functional components.
- It is a close replacement for **componentDidMount**, **componentDidUpdate**, and **componentWillUnmount**.

### Class component example using setState
#### App.js
```javascript
import React from 'react';
import './App.css';
import ClassCounterOne from './components/ClassCounterOne';
import HookCounterOne from './components/HookCounterOne';

function App() {
  return (
    <div className="App">
      <ClassCounterOne />
      <HookCounterOne />
    </div>
  );
}

export default App;
```
#### ClassCounterOne.js
```javascript
import React, { Component } from 'react';

class ClassCounterOne extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }
    componentDidMount() {
        document.title = `Clicked ${this.state.count} times`
    }
    componentDidUpdate(prevProps, prevState) {
        document.title = `Clicked ${this.state.count} times`
    }
    render() { 
        return ( 
            <div>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    Click {this.state.count} times
                </button>
            </div>
         );
    }
}
 
export default ClassCounterOne;
```
### Functional Component using React useEffect Hook(Implementing the same logic)
![](img/showEffect-after-render.gif)

#### HookCounterOne.js
```javascript
import React, {useState, useEffect} from 'react';

const HookCounterOne = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    return ( 
        <div>
            <button onClick={() => setCount(count + 1)}>
                Click {count} times
            </button>
        </div>
     );
}
 
export default HookCounterOne;
```

