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

    componentDidMount(){
        console.log("ComponentDidMount")
        console.log("--------------------------------")
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

    shouldComponentUpdate(nextProps, nextState){
        //we're not doing anything with ignoreProp, we're not rendering it to the UI, so we want to ignore it
        if(nextProps.ignoreProp && this.props.ignoreProp !== nextProps.ignoreProp){
            console.log("shouldComponentUpdate --- DO NOT RENDER")
            return false;
        }
        console.log("shouldComponentUpdate --- RENDER")
        return true;
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