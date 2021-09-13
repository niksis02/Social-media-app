import { PostContext } from '../Post';
import { useContext, useState } from 'react';

import likeIcon from '../../../../Assets/Pictures/like.svg';
import likedIcon from '../../../../Assets/Pictures/liked.svg';
import shareIcon from '../../../../Assets/Pictures/share.svg';
import commentIcon from '../../../../Assets/Pictures/comment.svg';

import './PostButtons.css';

const PostButtons = () => {
    const { post } = useContext(PostContext);
    const isLikedByCurrentUser = Boolean(post.likes.find(elem => elem === post.userId));
    const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);
    
    return ( 
        <div className="post-buttons">
            <div onClick={() => {setIsLiked(!isLiked)}}>
                {isLiked? <img src={likedIcon} className="post-liked-button" />: <img src={likeIcon}  className="post-like-button" />}
                <span style={{color: isLiked? '#2DCC70':'black'}}>Like</span>
            </div>
            <div className="post-comment-button">
                <img src={commentIcon} />
                <span>Comment</span>
            </div>
            <div className="post-share-button">
                <img src={shareIcon} />
                <span>Share</span>
            </div>
        </div>
     );
}
 
export default PostButtons;