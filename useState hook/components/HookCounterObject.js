import React, {useState} from 'react';

const HookCounterObject = () => {
    const [name, setName] = useState({firstname: '', lastname: ''})
    return ( 
        <form>
            <label>Firstname:</label>
            <input 
                type="text" 
                value={name.firstname}
                onChange={e => setName({...name, firstname: e.target.value})}
            />   
            <label>Lastname:</label>
            <input 
                type="text" 
                value={name.lastname}
                onChange={e => setName({...name, lastname: e.target.value})}
            />
            <h2>Your name is: {name.firstname} {name.lastname}</h2>
            <h2>{JSON.stringify(name)}</h2>
        </form> 
    );
}
 
export default HookCounterObject;