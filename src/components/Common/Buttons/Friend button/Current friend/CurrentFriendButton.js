import { useState, useRef } from 'react';

import Loading from '../../../Loading/Loading';
import useClickChecker from '../../../../../Hooks/useClickChecker';
import currentFriendIcon from '../../../../../Assets/Pictures/currentFriend.svg';

import './CurrentFriendButton.css';

const CurrentFriendButton = ({id, setFriendStatus}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const optionRef = useRef(null);
    const buttonRef = useRef(null);

    const { outside, setOutside } = useClickChecker(optionRef, buttonRef);

    const deleteFriend = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    receiverId: id
                })
            });

            const result = await response.json();
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
        <div className="friend-current-button-container" >
            <div className="friend-current-button" onClick={() => setOutside(!outside)} ref={buttonRef} >
                {loading && <Loading size={'16px'} />}
                <img src={currentFriendIcon} alt="Friend icon" />
                <span>Friends</span>
            </div>
            {!outside && 
                <div className="friend-current-options-box">
                    <ul className="friend-current-options" ref={optionRef} >
                        <li onClick={deleteFriend} ><span>Unfriend</span></li>
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default CurrentFriendButton;