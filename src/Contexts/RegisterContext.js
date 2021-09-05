import { createContext, useState } from "react";

export const RegisterContext = createContext();

export const RegisterProvider = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDay, setBirthDay] = useState(1);
    const [birthMonth, setBirthMonth] = useState('Jan');
    const [birthYear, setBirthYear] = useState(1905);
    const [gender, setGender] = useState(null);
    const [error, setError] = useState('');

    return ( 
        <RegisterContext.Provider value={{
            email, setEmail,
            password, setPassword,
            name, setName,
            surname, setSurname,
            birthDay, setBirthDay,
            birthMonth, setBirthMonth,
            birthYear, setBirthYear,
            gender, setGender,
            error, setError
        }}>
            {props.children}
        </RegisterContext.Provider>
     );
}