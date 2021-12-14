import { useContext } from 'react';

import FriendButton from '../../../../Common/Buttons/Friend button/FriendButton';
import MessageButton from '../../../../Common/Buttons/Message button/MessageButton';
import { ProfileContext } from '../../Profile';

import './ProfNavbarButtons.css';

const ProfNavbarButtons = () => {
    const { user, id } = useContext(ProfileContext);

    console.log(user);

    return ( 
        <div className="profile-navbar-buttons">
            {user.friendStatus !== 0 && <FriendButton id={id} friendStatusProp={user.friendStatus}/>}
            {user.friendStatus === 1 && <MessageButton user={user} />}
        </div>
     );
}
 
export default ProfNavbarButtons;