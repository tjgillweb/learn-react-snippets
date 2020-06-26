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
