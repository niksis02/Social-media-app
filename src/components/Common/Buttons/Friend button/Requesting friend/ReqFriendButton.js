import { useState } from 'react';

import Loading from '../../../Loading/Loading';
import cancelFriendRequestIcon from '../../../../../Assets/Pictures/req_cancel.svg';

import './ReqFriendButton.css';

const ReqFriendButton = ({id, setFriendStatus}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    const cancelFriendRequest = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/cancel', {
                method: 'post',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    receiverId: id
                })
            })
            const result = response.json();
            setLoading(false);
            setFriendStatus(4);
            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    return ( 
        <div className="friend-requesting-button" onClick={cancelFriendRequest}>
            {loading && <Loading size={'16px'} />}
            <img src={cancelFriendRequestIcon} alt="Request cancel" />
            <span>Cancel Request</span>
        </div>
     );
}
 
export default ReqFriendButton;