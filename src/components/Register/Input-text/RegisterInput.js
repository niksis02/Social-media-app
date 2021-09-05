import { useContext } from 'react';
import { RegisterContext } from '../../../Contexts/RegisterContext';

import './RegisterInput.css';

const Register_input = () => {
    const {
        name, 
        setName, 
        surname, 
        setSurname, 
        email, 
        setEmail, 
        password,
        setPassword
    } = useContext(RegisterContext);

    return ( 
        <>
            <div className="name-surname">
                <input 
                    className="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                <input 
                    className="surname"
                    type="text"
                    required
                    placeholder="Surname"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    />
            </div>
            <input 
                className="email"
                type="email" 
                required
                placeholder="Email"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                className="password"
                type="password" 
                required
                placeholder="Password"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
        </>
     );
}
 
export default Register_input;