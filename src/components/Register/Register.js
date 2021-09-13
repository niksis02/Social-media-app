import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import RegisterInput from './Input-text/RegisterInput';
import Select from './Select/Select';
import Gender from './Gender/Gender';

import { RegisterContext } from '../../Contexts/RegisterContext.js';

import './Register.css';

const Register = () => {
    const { 
        name,
        surname, 
        email,
        password, 
        birthDay, 
        birthMonth, 
        birthYear, 
        gender,
        error, 
        setError
    } = useContext(RegisterContext);

    let history = useHistory();
    const token = localStorage.getItem('token');

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            const data = await fetch('http://localhost:5000/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    password,
                    birth: `${birthDay}-${birthMonth}-${birthYear}`,
                    gender
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
        catch(err) {
            setError(err.message);
        }
    }

    if(token) {
        history.push('/');
        return null;
    }
    else {
        return ( 
            <div className="register">
                <form className="register-template" onSubmit={handleSubmit}>
                    <span className="top-bar"><Link to="/login">Login </Link>/ <span>Register</span></span>
                    { error ? <span className='register-error'> { error } </span>: null }
                    <RegisterInput />
                    <Select />
                    <Gender />
                    <button type="submit">Register</button>
                </form>
            </div>
         );
    }
}
 
export default Register;