import React, { useState } from 'react';  
import { Card } from 'primereact/card';  
import { InputText } from 'primereact/inputtext';  
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';  
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';  
import 'primeicons/primeicons.css';  
import './Login.css'; // Optional for custom styles  

const Login = () => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState(null);  
    const navigate = useNavigate();  

    const handleLogin = async (e) => {  
        e.preventDefault();  

        const requestBody = {  
            userName: username,  
            password: password  
        };  
        console.log(requestBody);
        try {  
            const response = await fetch('http://localhost:8080/white/auth/authenticate', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify(requestBody),  
            });  

            if (!response.ok) {  
                throw new Error('Authentication failed!');  
            }  
            
            const data = await response.json();
            const token = data.token;  
            console.log(token)

            localStorage.setItem('token', token); // Store token in localStorage  
            navigate('/main'); // Redirect to the main screen  
            window.location.reload();
        } catch (error) {  
            setError(error.message);  
        }  
    };  

    return (  
        <div className="login-container">  
            <Card title="Login" style={{ width: '350px', margin: 'auto', padding: '20px' }}>  
                {error && <div className="p-error">{error}</div>}  
                <form onSubmit={handleLogin}>  
                    <div className="p-field">  
                        <label htmlFor="username">Username</label>  
                        <InputText  
                            id="username"  
                            value={username}  
                            onChange={(e) => setUsername(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <div className="p-field">  
                        <label htmlFor="password">Password</label>  
                        <InputText  
                            id="password"  
                            type="password"  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            required  
                        />
         
                    </div> 

         
                    <Button label="Login" type="submit" style={{ width: '100%' }} />  
                </form>  
            </Card>  
        </div>  
    );  
};  

export default Login;