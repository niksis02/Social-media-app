import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token');

    const handleSubmit = async e => {
        e.preventDefault();

        const data = await fetch('http://localhost:5000/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        });
        const json = await data.json();
        if(json.status === 'error') {
            setError(json.msg);
        }
        if(json.status === 'ok') {
            const token = json.msg;
            localStorage.setItem('token', token);
            history.push('/');
        }
    }

    if(token) {
        history.push('/');
        return null;
    }
    else {
        return ( 
            <div className="login">
                <form className="login-template" onSubmit={handleSubmit}>
                    <span className="login-top-menu"><span>Login</span> / <Link to="/register">Register</Link></span>
                    { error ? <span className='register-error'> { error } </span>: null }
                    <input 
                        type="email" 
                        placeholder="Enter your email address"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
         );
    }
}
 
export default Login;