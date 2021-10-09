import { useContext } from 'react';

import FriendButton from '../../../../Common/Buttons/Friend button/FriendButton';
import { ProfileContext } from '../../Profile';

import './ProfNavbarButtons.css';

const ProfNavbarButtons = () => {
    const { user, id } = useContext(ProfileContext);

    return ( 
        <div className="profile-navbar-buttons">
            {user.friendStatus !== 0 && <FriendButton id={id} friendStatusProp={user.friendStatus}/>}
        </div>
     );
}
 
export default ProfNavbarButtons;