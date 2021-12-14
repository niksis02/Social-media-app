import { format } from 'timeago.js';

import './Message.css';

const Message = ({ own, user, msg }) => {

    return ( 
        own ? 
        <div className="message-own">
            <div>{msg.text}</div>
            <span>{format(msg.createdAt)}</span>
        </div>
        :
        <div className="message">
            <div>
                <img src={user.profilePic} alt="Profile picture" />
                <div>
                    {msg.text}
                </div>
            </div>
            <div className="message-date">{format(msg.createdAt)}</div>
        </div>
     );
}
 
export default Message;