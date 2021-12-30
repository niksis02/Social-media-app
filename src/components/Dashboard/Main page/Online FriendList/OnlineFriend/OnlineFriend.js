import { useContext } from 'react';

import { DashboardContext } from '../../../../../Contexts/DashboardContext';

import './OnlineFriend.css';

const OnlineFriend = ({user}) => {
    const { addOpenChat } = useContext(DashboardContext);
    console.log('chat user: ', user);

    return ( 
        <div className="online-friend" onClick={() => {addOpenChat(user)}}>
            <div>
                <img src={user.profilePic} alt="Profile picture" />
                <div></div>
            </div>
            <span>{`${user.name} ${user.surname}`}</span>
        </div>
     );
}
 
export default OnlineFriend;