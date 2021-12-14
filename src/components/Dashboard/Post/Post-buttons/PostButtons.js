import { PostContext } from '../Post';
import { useContext, useState } from 'react';

import likeIcon from '../../../../Assets/Pictures/like.svg';
import likedIcon from '../../../../Assets/Pictures/liked.svg';
import shareIcon from '../../../../Assets/Pictures/share.svg';
import commentIcon from '../../../../Assets/Pictures/comment.svg';

import './PostButtons.css';

const PostButtons = () => {
    const { post, likes, setLikes } = useContext(PostContext);
    const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);

    const token = localStorage.getItem('token');

    const handleLikes = async () => {
        if(isLiked) {
            try {
                const result = await fetch('http://localhost:5000/users/posts/likes/remove', {
                    method: 'put',
                    headers: {
                        "Authorization": token,
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        postId: post._id
                    })
                });
                const data = await result.json();
                if(data.status === 'ok') {
                    setIsLiked(false);
                    setLikes(like => like - 1);
                }
                else {
                    new Error(data.msg);
                }
            } catch(err) {
                console.log(err);
            }
        } 
        else {
            try {
                const result = await fetch('http://localhost:5000/users/posts/likes/add', {
                    method: 'put',
                    headers: {
                        "Authorization": token,
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        postId: post._id
                    })
                });
                const data = await result.json();
                if(data.status === 'ok') {
                    setIsLiked(true);
                    setLikes(like => like + 1);
                }
                else {
                    new Error(data.msg);
                }
            } catch(err) {
                console.log(err);
            }
        }
    }
    
    return ( 
        <div className="post-buttons">
            <div onClick={() => handleLikes()}>
                {isLiked? <img src={likedIcon} alt="Liked icon" className="post-liked-button" />: <img src={likeIcon} alt="Like icon"  className="post-like-button" />}
                <span style={{color: isLiked? '#2DCC70':'black'}}>Like</span>
            </div>
            <div className="post-comment-button">
                <img src={commentIcon} alt="Comment" />
                <span>Comment</span>
            </div>
            <div className="post-share-button">
                <img src={shareIcon} alt="Share" />
                <span>Share</span>
            </div>
        </div>
     );
}
 
export default PostButtons;