# React Portals
- React portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the Parent Component.
- So far we have had one DOM element in our HTML that we were mounting the React application into i.e. the root element `<div id="root"></div>`.
- In index.js, we use ReactDOM.render and mount our App component on to the root element. So, in the DOM tree, every single component in our application falls under the root element.
- React portals provide the ability to break out of this DOM tree so that you can render a component onto a DOM node that is not under this root element.

#### Steps to use React Portals
1. Add a DOM node that falls outside the root element. 
In public/index.html, right below the root element, add the following line of code:
#### index.html
```HTML
<div id="portal-root"></div>
```
2. Create a new component `PortalsDemo.js` inside src/components
3. Use `ReactDOM.createPortal` method to insert the PortalsDemo component under the portal-root node.

- Import ReactDOM package in the PortalsDemo component.
- Then in the render method, instead of just returning the JSX, we will return `ReactDOM.createPortal` and the method takes two parameters.
- The first parameter is the JSX you want to render, and the second parameter is the DOM node to mount the element onto.

#### PortalsDemo.js
```Javascript
import React from 'react';
import ReactDOM from 'react-dom'

const PortalsDemo = () => {
    return ReactDOM.createPortal( 
        <h1>
            Portals Demo
        </h1>,
        document.getElementById('portal-root')
     );
}
 
export default PortalsDemo;
```

#### App.js
```Javascript
import React from 'react';
import './App.css';
import PortalsDemo from './components/PortalsDemo';

function App() {
  return (
    <div className="App">
      <PortalsDemo />
    </div>
  );
}

export default App;
```
So, now when we check the browser, the `<h1>Portals Demo</h1>` is under the 'portal-root' DOM node and not the root DOM node.

### Portals Use Cases
1. When we have to deal with a parent component's CSS when the child component is a modal, a pop-up or a tooltip.   
So, sometimes its useful to insert a child into a different location in the DOM and portals help you do that.
We'll look at an example created by Kent C. Dodds on codesandbox.
[https://codesandbox.io/s/00254q4n6p](https://codesandbox.io/s/00254q4n6p)

2. Event bubbling: Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. This includes event bubbling. 
- So, an event fired from inside a portal will propagate to ancestors in the containing React tree even if those elements are not ancestors in the DOM tree.

To understand, we have a Codepen example: [https://codepen.io/gaearon/pen/jGBWpE](https://codepen.io/gaearon/pen/jGBWpE)
