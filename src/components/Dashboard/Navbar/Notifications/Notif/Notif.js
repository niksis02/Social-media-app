import { Link } from 'react-router-dom';
import Moment from 'moment';

import './Notif.css';

const Notif = ({notif}) => {
    const date = Moment(notif.createdAt).format('MMMM D') + ' at ' + Moment(notif.createdAt).format('HH:mm A');

    const handleDelete = (e) => {
        e.preventDefault();
    }

    const handleConfirm = (e) => {
        e.preventDefault();

    }


    return ( 
        <Link to={`/user-${notif.requesterUserId}`} className="notif">
            <li>
                <img src={notif.requesterProfPic} alt="Profile picture" />
                <div className="notif-info">
                    <span>
                        <strong>{`${notif.requesterUserName} ${notif.requesterUserSurname}  `}</strong>
                        sent you a friend request.
                    </span>
                    <p>{date}</p>
                    <div className="notif-buttons">
                        <div className="notif-confirm" onClick={(e) => {handleConfirm(e)}}>
                            <span>Confirm</span>
                        </div>
                        <div className="notif-delete" onClick={handleDelete}>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
     );
}
 
export default Notif;