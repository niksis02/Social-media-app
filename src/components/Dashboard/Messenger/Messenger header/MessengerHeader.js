import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as XIcon } from '../../../../Assets/Pictures/xIcon.svg';
import { DashboardContext } from '../../../../Contexts/DashboardContext';

import './MessengerHeader.css';

const MessengerHeader = ({ user }) => {
    const { setOpenChats } = useContext(DashboardContext);

    const closeChat = () => {
        setOpenChats(chats => 
            chats.filter(u => u._id !== user._id)
        );
    }

    return ( 
        <div className="messenger-header">
            <div className="messenger-header-userInfo">
                <Link to={`/user-${user._id}`} ><img src={user.profilePic} alt="Profile picture" /></Link>
                <Link to={`/user-${user._id}`} className="messenger-header-userName"><span>Sis Nikoyan</span></Link>
            </div>
            <div className="messenger-header-x-icon-container">
                <XIcon fill="#2DCC70" className="messenger-header-x-icon" onClick={closeChat} />
            </div>
        </div>
     );
}
 
export default MessengerHeader;