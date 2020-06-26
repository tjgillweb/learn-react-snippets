# React Refs
- Refs make it possible to access DOM nodes directly within React. 
- It allows you to reference elements on the page because one of the golden rule of React is that we don't touch the DOM.
- We would not like to put ID's on DOM elements and then access them using `document.querySelector('someId')`
- We can create a reference inside the constructor or outside it as a property on the class component. We can then attach that property to our input element and then use it as a way to reference that element.

### First possible use case: focusing an input field
In our example, we will create an input element we want the input to be focused by default on page load. It has 3 steps:
1. Create ref `inputRef` inside the constructor.
2. Attach this ref to the input element in the render method. We now have a reference to the input element.
3. Call the focus method on this input element.

- When we console.log(this.inputRef) we find out that it is an Object which has a property current of type input. And this current property points to the actual DOM node.
- So to focus on the input element, we simply call the focus method on the current property.

### Second possible use case: To fetch the input value

#### RefsDemo.js(using createRef())
```Javascript
import React, { Component } from 'react';

class RefsDemo extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
    }
    componentDidMount() {
        this.inputRef.current.focus()
        console.log(this.inputRef);
    }
    clickHandler = () => {
        alert(this.inputRef.current.value)
    }
    render() { 
        return ( 
            <div>
                <input type="text" ref={this.inputRef} />
                <button onClick={this.clickHandler}>Click</button>
            </div>
         );
    }
}
 
export default RefsDemo;
```
## Callback Refs
So, the approach used above is one possible way to create and access Refs, i.e. using the `createRef()` method. React also supports a second way to set refs which is called as Callback Refs. But it is a slightly older approach.

Let's take the same example of focusing input element. It has 4 steps:
1. Create the ref: create a property and assign it a value null inside the constructor.
2. Create a method that will assign a DOM element to the ref we have created in step 1.
3. Attach this ref to the input element.
4. Replace the previous code in componentDidMount with the new one and call the focus method.

React will call the ref callback with the DOM element when the component mounts and call it with null when it unmounts. That is the reason why it is important to check if a value exists on the reference property and that it is not null.

#### RefsDemo.js(using callback ref)
```Javascript
import React, { Component } from 'react';

class RefsDemo extends Component {
    constructor(props) {
        super(props);
        this.cbRef = null
        this.setCbRef = (element) => {
            this.cbRef = element
        }
    }
    componentDidMount() {
        if(this.cbRef){
            this.cbRef.focus()
        }
    }
    render() { 
        return ( 
            <div>
                <input type="text" ref={this.setCbRef} />
            </div>
         );
    }
}
 
export default RefsDemo;
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Refs with Class Components
- In the last section we learned how to add refs to an HTML element. It is also possible to add a ref to a class component.
- We can pass a ref from a Parent Component to a Child Component.
- Create a new file `Input.js`. This component will be an implementation of what we learned in the previous section.
- Then create a Parent Component for `Input.js` called `FocusInput.js`.

**GOAL:** When we click on the button 'Focus Input' in the Parent Component(FocusInput.js), the input element in the Child Component(Input.js) should receive the focus. And we achieve that by using refs on the Input Component. 

We have 3 steps to achieve that (check in FocusInput.js):
1. Create a ref using the createRef() method in the Parent Component.
2. Attach the ref to the component
3. Add a clickHandler to the button, and within the clickHandler call the Child Component method(focusInput()) using the ref.

#### Input.js(Child Component)
```Javascript
import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
    }

    focusInput(){
        this.inputRef.current.focus()
    }
    render() { 
        return (
            <div>
                <input type="text" ref={this.inputRef} />
            </div>
          );
    }
}
 
export default Input;
```
#### FocusInput.js(Parent Component)
```Javascript
import React, { Component } from 'react';
import Input from './Input'

class FocusInput extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef()
    }

    clickHandler = () => {
        this.componentRef.current.focusInput() //focusInput method defined in Input.js
    }
    render() { 
        return ( 
            <div>
                <Input ref={this.componentRef} />
                <button onClick={this.clickHandler}>Focus Input</button>
            </div>
         );
    }
}
 
export default FocusInput;
```
#### App.js
```Javascript
import React from 'react';
import './App.css';
import FocusInput from './components/FocusInput';

function App() {
  return (
    <div>
      <FocusInput />
    </div>
  );
}
```
export default App;
