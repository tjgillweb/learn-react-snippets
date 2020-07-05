# useMemo Hook

- Just like useCallback hook, useMemo hook is also concerned with performance optimization.
- Lets understand with the help of an example how to use the useMemo hook.

The following code makes the App look something like this:

![](img/useMemo1.gif)

#### App.js
```Javascript
import React from 'react';
import './App.css';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;

```

#### Counter.js
```Javascript
import React, {useState} from 'react';

const Counter = () => {
    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1)
    }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1)
    }

    const isEven = () => {
        return counterOne % 2 === 0
    }
    return ( 
        <div>
            <div>
                <button onClick={incrementOne}>Count One - {counterOne}</button>
                <span> {isEven() ? 'Even' : 'Odd'}</span>
            </div>
            <div>
                <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
            </div>
        </div>
     );
}
 
export default Counter

```

- Right now we have a simple isEven() function which hardly takes any time to execute. In real world applications though we will come across logic that takes considerable amount of time for execution i.e. a function without good performance. It could be for example, fetching thousands of items, mapping that array, filtering it and even sorting it.
- So, to mimic that kind of behaviour, lets induce some slowness into our isEven() function by iterating through a while loop for a long time.

![](img/useMemo2.gif)

```Javascript
    const isEven = () => {
        let i = 0
        while (i < 2000000000) i++
        return counterOne % 2 === 0
    }
```
- Now if we click on incrementCounter One, we can see that there is a second or two delay before the UI updates.
- This is because in the UI we are rendering whether the number is odd or even and that logic is from the isEven() function which is really slow.
- If we now click on incrementCounter Two, still there is a delay in the UI update. But the isEven() logic is applied only to Counter One. Why is then Counter Two slow as well?
- That is because every time the state updates, the component re-renders. And when the component re-renders, isEven() function is called again.
- So, what we need is a way to ***tell React not to recalculate certain values when unnecessary, especially the ones that take a long time to compute***.
- In our example, we need to tell React not to calculate whether CounterOne is even or odd when we are changing CounterTwo values. This is where useMemo hook comes into picture.
- ***useMemo is a hook that will only recompute cached value when one of the dependencies has changed***. This optimization helps to avoid expensive calculations on every render.

### How useMemo works ?
1. Import useMemo hook from react
2. Call the useMemo hook.
  - As the first argument, we pass in the function whose return value needs to be cached. In our example, isEven() function.
  - As the second argument, we need to specify the dependencies. In our example, isEven function depends on the value of counterOne i.e. whenever counterOne changes, we are telling React to recompute the value, and not use the cached value.

**NOTE:** useMemo returns a cached value which we assign to a variable (isEven in our example). So, please remove the parantheses after the isEven function in the JSX because now isEven is not goint to be a function call, it now stores a value.

#### Counter.js(after adding useMemo)
```Javascript
import React, {useState, useMemo} from 'react';

const Counter = () => {
    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1)
    }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1)
    }

    const isEven =  useMemo(() => {
        let i = 0
        while (i < 2000000000) i++
        return counterOne % 2 === 0
    }, [counterOne])
    return ( 
        <div>
            <div>
                <button onClick={incrementOne}>Count One - {counterOne}</button>
                <span> {isEven ? 'Even' : 'Odd'}</span>
            </div>
            <div>
                <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
            </div>
        </div>
     );
}
 
export default Counter
```

- Now when we click on Increment CounterOne, the delay is still present, because we nned to re-calculate is even or odd when value changes.
- When we click on CounterTwo, the updates are way faster. This is because React is now using the cached value of isEven function to display where count is odd or even.

### Difference between useCallback and useMemo
- useCallback caches the provided function instance itself whereas useMemo invokes the provided function and caches its result.
- If you need to cache a function use useCallback, when you need to cache the result of an invoked function, use useMemo.
