import { PostContext } from '../Post';
import { useContext, useState } from 'react';

import likeIcon from '../../../../Assets/Pictures/like.svg';
import likedIcon from '../../../../Assets/Pictures/liked.svg';
import shareIcon from '../../../../Assets/Pictures/share.svg';
import commentIcon from '../../../../Assets/Pictures/comment.svg';

import './PostButtons.css';

const PostButtons = () => {
    const { post, likes, setLikes } = useContext(PostContext);
    console.log(likes, 'hostId', post.hostId);
    const isLikedByCurrentUser = Boolean(likes.find(elem => elem === post.hostId));
    //console.log('IsLikedByCurrentUser',isLikedByCurrentUser);
    const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

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
                    setLikes(likes.filter(elem => elem !== post.hostId));
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
                    setLikes([...likes, post.hostId]);
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