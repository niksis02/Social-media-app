import { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import './Notif.css';

const Notif = ({notif, setNotifNumber}) => {
    const [isRequestConfirmed, setIsRequestConfirmed] = useState(false);
    const [isRequestDeleted, setIsRequestDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const date = Moment(notif.createdAt).format('MMMM D') + ' at ' + Moment(notif.createdAt).format('HH:mm A');
    const token = localStorage.getItem('token');

    const handleConfirm = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/confirm', {
                method: 'post',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    receiverId: notif.requesterUserId
                })
            })
            const result = response.json();
            setLoading(false);
            setIsRequestConfirmed(true);
            setNotifNumber(notifNumber => notifNumber - 1);
            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    const handleDelete = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    receiverId: notif.requesterUserId
                })
            })
            const result = response.json();
            setLoading(false);
            setIsRequestDeleted(true);
            setNotifNumber(notifNumber => notifNumber - 1);
            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
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
                    {
                        isRequestConfirmed &&
                        <span>Request accepted</span>
                    }
                    {
                        isRequestDeleted &&
                        <span>Request removed</span>
                    }
                    {
                        !isRequestDeleted && !isRequestConfirmed &&
                        <div className="notif-buttons">
                            <div className="notif-confirm" onClick={(e) => {handleConfirm(e)}}>
                                <span>Confirm</span>
                            </div>
                            <div className="notif-delete" onClick={handleDelete}>
                                <span>Delete</span>
                            </div>
                        </div>
                    }
                </div>
            </li>
        </Link>
     );
}
 
export default Notif;