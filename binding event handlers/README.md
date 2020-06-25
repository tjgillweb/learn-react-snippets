# Binding Event Handlers

The reason we bind event handlers in React components is purely because of the way `this` keyword works in Javascript. It is not because of how React works.  
There are four approaches to bind event handlers in React :  
1. **Binding in render** (performance issues)
2. **Arrow function in render** (suitable when you want to pass parameters, but use only if your code does not involve re-rendering nested children components)
3. **Binding in the class constructor** (React recommended, best option)
4. **Class property as arrow functions** (React recommended but still experimental)

In this example we want to change the message(which is part of the component state) on the screen from 'Hello' to 'Goodbye' when we click on the button.

#### EventBind.js
```Javascript
import React, { Component } from 'react';

class EventBind extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: 'Hello'
         }
    }

    clickHandler(){
        this.setState({
            message: 'Goodbye'
        })
        console.log(this); //returns undefined
    } 
    render() { 
        return (
            <div> 
                <h2>{this.state.message}</h2>
                <button onClick={this.clickHandler}>Click</button>
            </div>
         );
    }
}
 
export default EventBind;
```
If we try to run the code above, our application breaks like this: 

![](img/event-bind1.gif)

***The `this` keyword is undefined inside our event handler method, and that is the reason why event binding is necessary in React components.***

### 1. Binding in render
```Javascript
render() { 
    return (
        <div> 
            <h2>{this.state.message}</h2>
            {/* <button onClick={this.clickHandler}>Click</button> */}
            <button onClick={this.clickHandler.bind(this)}>Click</button>
        </div>
     );
}
```
- Now the setState method works without any errors, and the message reads Goodbye, and this keyword is not undefined anymore. It refers to the EventBind component instance.
- Although this option works perfectly fine but every update to the state will cause the component to re-render. This in turn will generate a brand new event handler on every render. 
- Hence it can cause performance issues in large applications, and components that contain nested children components.

![](img/event-bind2.gif)

### 2. Arrow function in render
- parantheses are required at the end of the arrow function because we are calling the event handler and returning that value.
```Javascript
<button onClick={() => this.clickHandler()}>Click</button>
```

### 3. Binding in the class constructor
- Because the binding happens once in the constructor, it is better than binding in the render method.
```Javascript
constructor(props) {
        super(props);
        this.state = { 
            message: 'Hello'
         }
    this.clickHandler = this.clickHandler.bind(this)
    }
render(){
  ...
    <button onClick={this.clickHandler}>Click</button>
  ...
 }
 ```
 
 ### 4. Arrow Function as a Class Property
 - Change the way you define method in the class. Use arrow function instead of regular function.
 ```Javascript
clickHandler = () => {
    this.setState({
        message: 'Goodbye'
    })
}
render(){
  ...
    <button onClick={this.clickHandler}>Click</button>
  ...
 }
 ```
