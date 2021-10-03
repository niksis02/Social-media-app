import { useContext } from 'react';

import AddFriend from '../../../../Common/Buttons/Add friend/AddFriend';
import { ProfileContext } from '../../Profile';

import './ProfNavbarButtons.css';

const ProfNavbarButtons = () => {
    const { user } = useContext(ProfileContext);

    return ( 
        <div className="profile-navbar-buttons">
            {!user.host && <AddFriend />}
        </div>
     );
}
 
export default ProfNavbarButtons;