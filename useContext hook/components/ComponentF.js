import React from 'react';
import { UserContext } from '../App'

const ComponentF = () => {
    return ( 
        <div>
            <UserContext.Consumer>
                {
                    user => {
                        return <div>User context value {user}</div>
                    }
                }
            </UserContext.Consumer>
        </div>
     );
}
 
export default ComponentF;