import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../Post';
import Moment from 'moment';

import moreIcon from '../../../../Assets/Pictures/more.svg';

import './PostHeader.css';

const PostHeader = () => {
    const { post } = useContext(PostContext);
    const date = Moment(post.createdAt).format('MMMM D') + ' at ' + Moment(post.createdAt).format('HH:mm A');
    const [createDate, setCreateDate] = useState(date);

    return ( 
        <div className="post-header">
            <Link to={`/user-${post.userId}`}><img src={post.authorProfPic}/></Link>
            <div className="post-author-date">
                <Link to={`/user-${post.userId}`}><span>{post.authorName + ' ' + post.authorSurname}</span></Link>
                <span>{createDate}</span>
            </div>
            <img src={moreIcon} className="post-options">
                
            </img>
        </div>
     );
}
 
export default PostHeader;