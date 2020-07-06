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
