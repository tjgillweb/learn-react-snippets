# Render Props
- The render props pattern just like HOC pattern helps to share common functionality between components.
- The term 'Render Props' refers to a technique for ***sharing code*** between React components using a ***prop whose value is a function***.

To understand, lets say we want to display a name='Elon' to the screen.

#### Create User.js
```Javascript
import React, { Component } from 'react';

class User extends Component {
    render() { 
        return ( 
            <div>
                {this.props.name} 
            </div>
        );
    }
}
export default User;
```
#### App.js
```Javascript
import React from 'react';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <User name='Elon'/>
    </div>
  );
}

export default App;
```
- pass a prop 'name' from User Component(in App.js) ```<User name='Elon'/>``` and render it in User.js using `{this.props.name}` 
- Now, instead of simply passing the string name='Elon' as name prop, I want to pass a function which will return the string 'Elon'  
```Javascript 
    <User name={ () => 'Elon' }/> 
```
- In User.js add parantheses to call the function `{this.props.name()}`. Its the same as before. The only difference now is that it contains a reference to a function.
- The name Elon is displayed in the browser. Everything works fine as before.
- For the next step, I want to have parameters to the function in the name prop. Based on the parameter, I want to change what is rendered by the User component. 
- So, we will pass a parameter `isLoggedIn` as a parameter and the function will return the string 'Elon' or 'Guest' based on the value of isLoggedIn.
```Javascript 
    <User name={ (isLoggedIn) => isLoggedIn ? 'Elon' : 'Guest' }/>
```
- In User.js, the name prop will accept an argument which I will pass as true/false `{this.props.name(true)}`.

- Now, in App Component, we will rename name prop to render and also change it in User Component. This is valid and does not conflict with the render lifecycle method in any way.
#### In App.js
```Javascript 
    <User render={ (isLoggedIn) => isLoggedIn ? 'Elon' : 'Guest' }/>
```
#### In User.js
```Javascript 
    render() { 
        return ( 
            <div>
                {this.props.render()} 
            </div>
        );
    }
```
> In react, it is possible to use a prop whose value is a function to control what is actually rendered by a component. This is what the Render Props pattern is based on.
