import React, { Component } from 'react';

class EventBind extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: 'Hello'
         }
    // this.clickHandler = this.clickHandler.bind(this) // Approach no. 3
    }

    // clickHandler(){
    //     this.setState({
    //         message: 'Goodbye'
    //     })
    //     console.log(this); //returns undefined
    // } 

    // Approach no. 4
    clickHandler = () => {
        this.setState({
            message: 'Goodbye'
        })
    }

    render() { 
        return (
            <div> 
                <h2>{this.state.message}</h2>
                {/* Approach no. 1 <button onClick={this.clickHandler.bind(this)}>Click</button> */}
                {/* Approach no. 2 <button onClick={() => this.clickHandler()}>Click</button> */}
                {/* Approach no. 3 <button onClick={this.clickHandler}>Click</button> */}
                {/* Approach no. 4 */ }<button onClick={this.clickHandler}>Click</button>
            </div>
         );
    }
}
 
export default EventBind;