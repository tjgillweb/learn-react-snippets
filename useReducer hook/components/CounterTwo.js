import React, {useReducer} from 'react';

const initialState = {
    firstCounter: 0
}
const reducer = (state, action) => {
    //return newState
    switch(action.type){
        case 'increment':
            return { firstCounter: state.firstCounter + 1 }
        case 'decrement':
            return { firstCounter: state.firstCounter - 1}
        case 'reset':
            return initialState
        default:
            return state
    }
}
const CounterTwo = () => {
    const [count, dispatch] = useReducer(reducer, initialState)
    return ( 
        <div>
            <h2>Count - {count.firstCounter}</h2>
            <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
            <button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>
            <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
        </div>
     );
}
 
export default CounterTwo;