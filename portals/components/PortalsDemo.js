import React from 'react';
import ReactDOM from 'react-dom'

const PortalsDemo = () => {
    return ReactDOM.createPortal( 
        <h1>
            Portals Demo
        </h1>,
        document.getElementById('portal-root')
     );
}
 
export default PortalsDemo;