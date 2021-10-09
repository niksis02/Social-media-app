import { useState } from 'react';

import Loading from '../../../Loading/Loading';

import addFriendIcon from '../../../../../Assets/Pictures/add_friend.svg';

import './AddFriendButton.css';

const AddFriendButton = ({ id, setFriendStatus }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');


    const sendFriendRequest = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/add', {
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
            setFriendStatus(2);
            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    return ( 
        <div className="add-friend-button" onClick={sendFriendRequest}>
            {loading && <Loading size={'16px'} />}
            <img src={addFriendIcon} alt="Add Friend" />
            <span>Add Friend</span>
        </div>
     );
}
 
export default AddFriendButton;