import { useState } from 'react';
import { Link } from 'react-router-dom';

import profilePhotoMale from '../../../../../../Assets/Pictures/profile_male.png';
import profilePhotoFemale from '../../../../../../Assets/Pictures/profile_female.png';

import './UserSearchItem.css';

const UserSearchItem = ({user, setOutside}) => {
    const profilePic = user.profilePhoto? user.profilePhoto: user.gender?profilePhotoMale:profilePhotoFemale;
    
    return ( 
        <ul>
            <Link to={`/user-${user._id}`} className="userList-item">
                <li onClick={() => {setOutside(true)}}>
                    <img src={profilePic} alt="Profile Picture" />
                    <span>{`${user.name} ${user.surname}`}</span>
                </li>
            </Link>
        </ul>
     );
}
 
export default UserSearchItem;