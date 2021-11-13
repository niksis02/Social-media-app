import { Link } from 'react-router-dom';
import Moment from 'moment';

import './Notif.css';

const Notif = ({notif}) => {
    const date = Moment(notif.createdAt).format('MMMM D') + ' at ' + Moment(notif.createdAt).format('HH:mm A');

    return ( 
        <Link to={`/user-${notif.requesterUserId}`}>
            <li className="notif">
                <img src={notif.requesterProfPic} alt="Profile picture" />
                <div className="notif-info">
                    <span>{`${notif.requesterUserName} ${notif.requesterUserSurname} sent your a friend request.`}</span>
                    <span>{date}</span>
                    <div className="notif-buttons">
                        <button>Confirm</button>
                        <button>Delete</button>
                    </div>
                </div>
            </li>
        </Link>
     );
}
 
export default Notif;