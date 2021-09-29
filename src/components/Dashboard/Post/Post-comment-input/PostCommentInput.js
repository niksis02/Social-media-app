import { useContext, useState } from 'react';

import { PostContext } from '../Post';


import './PostCommentInput.css';

const PostCommentInput = () => {
    const { post } = useContext(PostContext);
    const [comment, setComment] = useState('');

    return ( 
        <div className="post-comment-input">
            <img src={post.authorProfPic} />
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