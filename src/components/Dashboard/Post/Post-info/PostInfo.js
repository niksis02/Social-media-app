import { useContext } from 'react';

import { PostContext } from '../Post';

import { ReactComponent as LikeIcon } from '../../../../Assets/Pictures/likeIcon.svg';

import './PostInfo.css';

const PostInfo = () => {
    const { post } = useContext(PostContext);

    return ( 
        <>
        {
            post.likes.length !== 0 || post.comments.length !== 0?
            <div className="post-info">
                <div className="post-likes-bar">
                {
                post.likes.length !== 0?
                <>
                    <LikeIcon fill="#2DCC70" />
                    <span>{post.likes.length}</span>
                </>
                    :null
                }
                </div>
                <div className="post-info-comment-bar">
                {
                post.comments.length !== 0?
                <>
                    <span>{post.comments.length} Comments</span>
                    <span>Shares</span>
                </>
                    :null
                }
                </div>
            </div>
            :null
        }
        </>
     );
}
 
export default PostInfo;