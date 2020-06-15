import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        console.log("Constructor");
        super(props);
        this.state = { 
            counter: 0,
            seed: 0
         }
         this.increment = () => this.setState({counter: this.state.counter + 1});
         this.decrement = () => this.setState({counter: this.state.counter - 1});
    }
    static getDerivedStateFromProps(props, state){
        //gives you a chance to copy any values from props that you maybe interested in transferring over to state
        console.log('getDerivedStateFromProps')
        if(props.seed && state.seed !== props.seed){
            return{
                seed: props.seed,
                counter: props.seed
            }
        }
        return null //if you don't want to change state
    }
    componentDidMount(){
        console.log("ComponentDidMount")
        console.log("--------------------------------")
    }
    render() { 
        console.log("Render");
        return ( 
            <div>
                <div className="counter">
                    <h2>Counter: {this.state.counter}</h2>
                </div>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
         );
    }
}
 
export default Counter;