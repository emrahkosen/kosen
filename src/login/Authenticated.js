import React from 'react';  

const Authenticated = () => {  
    const token = localStorage.getItem('token'); // Retrieve the token if needed  

    return (  
        <div>  
            <h2>Welcome to the Authenticated Screen</h2>  
            <p>Your token is: {token}</p>  
        </div>  
    );  
};  

export default Authenticated;