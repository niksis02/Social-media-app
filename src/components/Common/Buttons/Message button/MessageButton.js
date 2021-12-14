import { useContext } from 'react';
import { DashboardContext } from '../../../../Contexts/DashboardContext';

import messageIcon from '../../../../Assets/Pictures/messenger.svg';

import './MessageButton.css';

const MessageButton = ({ user }) => {
    const { addOpenChat } = useContext(DashboardContext);

    return ( 
        <div className="message-button" onClick={() => { addOpenChat(user)}}>
            <img src={messageIcon} alt="M" />
            <span>Message</span>
        </div>
     );
}
 
export default MessageButton;