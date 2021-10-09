import { useState, useRef } from 'react';

import Loading from '../../../Loading/Loading';

import friendIcon from '../../../../../Assets/Pictures/friendIcon.svg';

import './ConfirmFriendButton.css';
import useClickChecker from '../../../../../Hooks/useClickChecker';

const ConfirmFriendButton = ({id, setFriendStatus}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const optionRef = useRef(null);
    const buttonRef = useRef(null);

    const { outside, setOutside } = useClickChecker(optionRef, buttonRef);

    const cancelFriendRequest = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/delete', {
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

    const confirmFriendRequest = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/confirm', {
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
            setFriendStatus(1);
            if(result.status === 'error') {
                setError(result.msg);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    return ( 
        <div className="friend-confirm-button-container" >
            <div className="friend-confirm-button" onClick={() => setOutside(!outside)} ref={buttonRef} >
                {loading && <Loading size={'16px'} />}
                <img src={friendIcon} alt="Friend icon" />
                <span>Respond</span>
            </div>
            {!outside && 
                <div className="friend-confirm-options-box">
                    <ul className="friend-confirm-options" ref={optionRef} >
                        <li onClick={confirmFriendRequest}><span>Confirm</span></li>
                        <li onClick={cancelFriendRequest} ><span>Delete</span></li>
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default ConfirmFriendButton;