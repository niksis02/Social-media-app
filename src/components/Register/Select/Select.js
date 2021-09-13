import { useContext } from 'react';
import { RegisterContext } from '../../../Contexts/RegisterContext';

import './Select.css';

const Select = () => {
    const {
        birthDay,
        setBirthDay,
        birthMonth,
        setBirthMonth,
        birthYear,
        setBirthYear,
    } = useContext(RegisterContext);

    const dayOptions = new Array(31).fill(0).map((elem, index) => elem = index + 1);
    const monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const YearOptions = new Array(117).fill(0).map((elem, index) => elem = 1905 + index);

    return (  
        <div className="select-template">
            <span className="date-of-birth">Date of birth</span>
            <div className="select">
                <select onChange={e => setBirthDay(e.target.value)} value={birthDay} required>
                    {dayOptions.map((elem, index) => (
                        <option 
                            key={index} 
                            value={elem}
                        >{elem}</option>
                    ))}
                </select>
                <select onChange={e => setBirthMonth(e.target.value)} value={birthMonth} required>
                    {monthOptions.map((elem, index) => (
                        <option 
                            key={index} 
                            value={index + 1}
                        >{elem}</option>
                    ))}
                </select>
                <select onChange={e => setBirthYear(e.target.value)} value={birthYear} required>
                    {YearOptions.map((elem, index) => (
                        <option 
                            key={index} 
                            value={elem}
                        >{elem}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
 
export default Select;