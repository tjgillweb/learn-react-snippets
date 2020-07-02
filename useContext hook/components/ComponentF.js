import React from 'react';
import { UserContext, OrganizationContext } from '../App'

const ComponentF = () => {
    return ( 
        <div>
            <UserContext.Consumer>
                {
                    user => {
                        return (
                            <OrganizationContext.Consumer>
                                {
                                    organization => {
                                        return (
                                            <div>
                                                <h2>User context value {user}</h2>
                                                <h3>Organization context value {organization}</h3>
                                            </div>
                                        )
                                    }
                                }
                            </OrganizationContext.Consumer>
                        )
                    }
                }
            </UserContext.Consumer>
        </div>
     );
}
 
export default ComponentF;