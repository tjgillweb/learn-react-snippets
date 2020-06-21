# useEffect Hook
- The useEffect hook lets you perform side effects in functional components.
- It is a close replacement for **componentDidMount**, **componentDidUpdate**, and **componentWillUnmount**.
- The useEffect hook is called at the initial render and ***after every single render***.

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
----------------------------------------------------------------------------------------------------------------------------------------
## Conditionally run effects
- As we know, useEffect hook is called after every single render. In some cases, it might cause performance issues.
- So we need a way to conditionally run an effect from our functional component.
- To understand, lets make some changes to the ClassCounterOne.js 

### Class component implementation
#### ClassCounterOne.js
```Javascript
class ClassCounterOne extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0,
            name: ''
         }
    }
    componentDidMount() {
        document.title = `Clicked ${this.state.count} times`
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Updating document title');
        document.title = `Clicked ${this.state.count} times`
    }
    render() { 
        return ( 
            <div> 
                <input type="text" 
                    value={this.state.name} 
                    onChange={e => {
                        this.setState({name: e.target.value})
                    }} 
                />
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    Click {this.state.count} times
                </button>
            </div>
         );
    }
}
```
![](img/useEffect-conditional-problem.gif)

- When we click on the button, we can see the log statement and the document title updates.
- But when we start typing in the text box we still get the log statement 'Updating document title' which is basically setting the document title to the same string 7 times which is unnecessary as the count value is still 1. 
- To optimize this, we can compare the count value before and after the update, and if at all the count value changed, we then conditionally update the title. There is no need to update the title if its not even changing between the renders.
#### ClassCounterOne.js
```javascript
componentDidUpdate(prevProps, prevState) {
    //conditionally updating the title only when the appropriate variable(count) changes
    if(prevState.count !== this.state.count){
        console.log('Updating document title');
    }
    document.title = `Clicked ${this.state.count} times`
}
```
![](img/useEffect-conditional-solution.gif)

### Functional component implementation(useEffect) 
- In class components, we added a check to compare the previous state with the current state and only update if there is a difference to conditionally run useEffect only when the count value changes.
- In useEffect, for conditionally executing an effect, we pass in a second parameter, called the ***dependency array***.
- Within this array, we need to specify either props or state that we need to watch for only if those props and state specified in this array were to change the effect would be executed.
- In our example, we need the effect to be executed only when the count value changes.

![](img/useEffect-conditional-array.gif)
#### HookCounterOne.js
```javascript
import React, {useState, useEffect} from 'react';

const HookCounterOne = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        console.log('useEffect - updating document title');
        document.title = `You clicked ${count} times`
    }, [count])
    return ( 
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => setCount(count + 1)}>
                Click {count} times
            </button>
        </div>
     );
}
 
export default HookCounterOne;
```
