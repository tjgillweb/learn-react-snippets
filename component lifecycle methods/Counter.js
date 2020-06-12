import React, { Component } from 'react';
class Counter extends Component {
    constructor(props) {
        console.log("Constructor");
        super(props);
        this.state = { 
            counter: 0
         }
    }
    render() { 
        console.log("Render");
        return ( 
            <div>
                <div className="counter">
                    <h2>Counter: {this.state.counter}</h2>
                </div>
            </div>
         );
    }
}
 
export default Counter;