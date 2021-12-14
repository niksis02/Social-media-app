import { useState } from 'react';
import { Link } from 'react-router-dom';

import {ReactComponent as LikeIcon} from '../../../../../../Assets/Pictures/likeIcon.svg';

import MessageButton from '../../../../../Common/Buttons/Message button/MessageButton';
import ReqFriendButton from '../../../../../Common/Buttons/Friend button/Requesting friend/ReqFriendButton';
import ConfirmFriendButton from '../../../../../Common/Buttons/Friend button/Confirm friend/ConfirmFriendButton';
import AddFriendButton from '../../../../../Common/Buttons/Friend button/Add friend/AddFriendButton';

import './PostLikeListItem.css';

const PostLikeListItem = ({user}) => {
    const [friendStatus, setFriendStatus] = useState(user.friendStatus);

    return ( 
        <div className="post-like-list-item">
            <div className="post-like-list-item-1">
                <div>
                    <Link to={`/user-${user._id}`}>
                        <img src={user.profilePic} alt="Profile picture" className="post-like-list-item-img1" />
                    </Link>
                    <div>
                        <LikeIcon fill="#2DCC70" className="post-like-list-item-img2" />
                    </div>
                </div>
                <Link to={`/user-${user._id}`}>
                    <span>{`${user.name} ${user.surname}`}</span>
                </Link>
            </div>
            {friendStatus === 1 && <MessageButton user={user} />}
            {friendStatus === 2 && <ReqFriendButton id={user._id} setFriendStatus={setFriendStatus} />}
            {friendStatus === 3 && <ConfirmFriendButton id={user._id} setFriendStatus={setFriendStatus} />}
            {friendStatus === 4 && <AddFriendButton id={user._id} setFriendStatus={setFriendStatus} />}
        </div>
     );
}
 
export default PostLikeListItem;