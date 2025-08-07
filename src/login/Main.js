import React from 'react';   
import { Button } from 'primereact/button';  
import { useNavigate } from 'react-router-dom';  

const Main = () => {  
    const navigate = useNavigate();  

    const handleLogout = () => {  
        localStorage.removeItem('token'); // Clear token from localStorage  
        navigate('/'); // Redirect to login page 
        window.location.reload(); 
    };  

    return (  
        <div>  
            
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>  
                    <div className="p-m-2">My Application</div>  
                    <Button icon="pi pi-sign-out" label="Logout" onClick={handleLogout} />  
                </div>  
            
            <div style={{ padding: '20px' }}>  
                <h2>Welcome to the Main Screen!</h2>  
                {/* Add main content here */}  
            </div>  
        </div>  
    );  
};  

export default Main;