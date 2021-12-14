import { useEffect, useState } from 'react';

import AddFriendButton from './Add friend/AddFriendButton';
import CurrentFriendButton from './Current friend/CurrentFriendButton';
import ConfirmFriendButton from './Confirm friend/ConfirmFriendButton';
import ReqFriendButton from './Requesting friend/ReqFriendButton';

import './FriendButton.css';

const FriendButton = ({id, friendStatusProp}) => {
    const [friendStatus, setFriendStatus] = useState(friendStatusProp);
    useEffect(() => {
        setFriendStatus(friendStatusProp)
    }, [id, friendStatusProp]);

    return ( 
        <>
            {friendStatus === 1 && <CurrentFriendButton id={id} setFriendStatus={setFriendStatus} />}
            {friendStatus === 2 && <ReqFriendButton id={id} setFriendStatus={setFriendStatus} />}
            {friendStatus === 3 && <ConfirmFriendButton id={id} setFriendStatus={setFriendStatus} />}
            {friendStatus === 4 && <AddFriendButton id={id} setFriendStatus={setFriendStatus} />}
        </>
     );
}
 
export default FriendButton;