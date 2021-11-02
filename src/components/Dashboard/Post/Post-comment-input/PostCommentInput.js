import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostContext } from '../Post';


import './PostCommentInput.css';

const PostCommentInput = () => {
    const { post } = useContext(PostContext);
    const [comment, setComment] = useState('');

    return ( 
        <div className="post-comment-input">
            <Link to={`/user-${post.hostId}`}>
                <img src={post.hostProfPic} alt="Profile pic" />
            </Link>
            <input 
                type="text" 
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => {setComment(e.target.value)}}
            />
        </div>
     );
}
 
export default PostCommentInput;