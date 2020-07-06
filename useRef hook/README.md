# useRef hook

useref hook makes it possible to access DOM nodes directly within functional components.

## First use case: focusing a text input by default on page load.
- we will need to implement componentDidMount in functional component using useEffect as we want the input to focus once.
- So, in the useEffect hook, we keep the dependency array empty as we want this function to execute only once and we want to focus the input element inside the function. 

### How to use useRef?
1. Import useRef from react
2. Create a ref variable by calling useRef and passing in the initial value.
3. Attach the ref to the input element using the ref attribute on the input field.
4. Call the focus method on the input element within the useEffect arrow function.

- Now as soon as the page loads, the component mounts and the input element is focused.

#### App.js
```Javascript
import React from 'react';
import './App.css';
import FocusInput from './components/FocusInput';

function App() {
  return (
    <div className="App">
      <FocusInput />
    </div>
  );
}

export default App;

```

#### FocusInput.js
```Javascript
import React, {useEffect, useRef} from 'react';

const FocusInput = () => {

    const inputRef = useRef(null)

    useEffect(() => {
        //focus the input element
        inputRef.current.focus()
    }, [])

    return ( 
        <div>
            <input ref={inputRef} type="text" />
        </div>
     );
}
 
export default FocusInput;
```

## Second use case: Implement an interval timer that ticks every second and displays the value in the browser
- It can be used to create a generic container(a variable) which can hold a mutable value similar to instance properties on class components.
- This generic container does not cause re-renders when the data it stores changes.
- Also after we implement the interval timer, create a button such that when we click the button, it clears the timer and the timer stops.

### Class component code to implement the interval timer
#### ClassTimer.js
```Javascript
import React, { Component } from 'react';

class ClassTimer extends Component {
    interval
    constructor(props) {
        super(props);
        this.state = { 
            timer: 0
         }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => ({timer: prevState.timer + 1}))
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() { 
        return ( 
            <div>
                Class Timer - {this.state.timer}
                <button onClick={() => clearInterval(this.interval)}>Clear Timer</button>
            </div>
         );
    }
}
 
export default ClassTimer;
```

#### App.js
```Javascript
import React from 'react';
import './App.css';
import ClassTimer from './components/ClassTimer';

function App() {
  return (
    <div className="App">
      <ClassTimer />
    </div>
  );
}

export default App;
```

### Functional component code to implement the interval timer

#### HookTimer.js
```Javascript
import React, {useState, useEffect} from 'react';

const HookTimer = () => {
    const [timer, setTimer] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return ( 
        <div>
            Hook Timer - {timer}
            <button onClick={() => clearInterval(interval)}>Clear Hook Timer</button>
        </div>
     );
}
 
export default HookTimer;
```
- If we run the above code, the timer works, but when we click on the Clear Hook Timer button, we receive an error: 'interval' is not defined.
- This happens because the 'interval' variable is scoped only to the effect hook. So, we can clear the interval from within the effect hook, but not from an event handler. This is where useref comes to the rescue.
- Although useRef can hold a reference to a DOM node using the ref attribute, it can also be used to store any mutable value. And that value will persist through the re-renders while also not causing any additional renders when its value changes.

1. import useRef from React.
2. invoke useRef and assign it to a variable.
3. replace interval variable with intervalRef.current at all places.

#### HookTimer.js(updated after adding useRef)
```Javascript
import React, {useState, useEffect, useRef} from 'react';

const HookTimer = () => {
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef()
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])
    return ( 
        <div>
            Hook Timer - {timer}
            <button onClick={() => clearInterval(intervalRef.current)}>Clear Hook Timer</button>
        </div>
     );
}
 
export default HookTimer;
```
