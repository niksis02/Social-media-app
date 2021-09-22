import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../Post';
import Moment from 'moment';

import moreIcon from '../../../../Assets/Pictures/more.svg';

import './PostHeader.css';

const PostHeader = () => {
    const { post, userInfo } = useContext(PostContext);
    const date = Moment(post.createdAt).format('MMMM D') + ' at ' + Moment(post.createdAt).format('HH:mm A');
    const [createDate, setCreateDate] = useState(date);

    return ( 
        <div className="post-header">
            <Link to={`/user-${post.userId}`}><img src={userInfo.profilePhoto}/></Link>
            <div className="post-author-date">
                <Link to={`/user-${post.userId}`}><span>{userInfo.name + ' ' + userInfo.surname}</span></Link>
                <span>{createDate}</span>
            </div>
            <img src={moreIcon} className="post-options">
                
            </img>
        </div>
     );
}
 
export default PostHeader;