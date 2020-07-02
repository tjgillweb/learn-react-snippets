import React, { useContext } from 'react';
import ComponentF from './ComponentF';
import { UserContext, OrganizationContext } from '../App'

const ComponentE = () => {
    const user = useContext(UserContext)
    const organization = useContext(OrganizationContext)
    return ( 
        <div>
            {user} - {organization}
        </div>
     );
}
 
export default ComponentE;