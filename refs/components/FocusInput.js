import React, { Component } from 'react';
import Input from './Input'

class FocusInput extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef()
    }

    clickHandler = () =>{
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