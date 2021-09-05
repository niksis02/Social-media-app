import { useContext } from 'react';
import { RegisterContext } from '../../../Contexts/RegisterContext';

import './Gender.css';

const Gender = () => {
    const {setGender} = useContext(RegisterContext)
;
    return (  
        <div className="radio-template">
            <span>Gender</span>
            <div className="button-radio">
                <label>
                    <div className="male" onClick={() => {setGender(true)}}>
                        <span>Male</span> 
                        <input  type="radio" name="gender" required></input>
                    </div>
                </label>
                <label>
                    <div className="female" onClick={() => {setGender(false)}}>
                        <span>Female</span>
                        <input  type="radio" name="gender" required></input>
                    </div>
                </label>
            </div>
        </div>
    );
}
 
export default Gender;