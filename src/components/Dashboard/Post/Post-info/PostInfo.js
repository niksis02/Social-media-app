import { useContext, useState } from 'react';

import { PostContext } from '../Post';

import { ReactComponent as LikeIcon } from '../../../../Assets/Pictures/likeIcon.svg';
import PostLikeList from './Post-like-list/PostLikeList';

import './PostInfo.css';

const PostInfo = () => {
    const { post, likes } = useContext(PostContext);
    const [isPostLikesOpen, setIstPostLikesOpen] = useState(false);

    const handlePostLikes = e => {
        setIstPostLikesOpen(l => setIstPostLikesOpen(!l));
    }

    return ( 
        <>
        {
            likes !== 0 || post.comments !== 0?
            <div className="post-info">
                <div className="post-likes-bar">
                {
                likes !== 0?
                <>
                    <LikeIcon fill="#2DCC70" onClick={e => { handlePostLikes(e) }} />
                    <span onClick={e => { handlePostLikes(e) }}>{likes}</span>
                </>
                    :null
                }
                </div>
                <div className="post-info-comment-bar">
                {
                post.comments !== 0?
                <>
                    <span>{post.comments} Comments</span>
                    <span>Shares</span>
                </>
                    :null
                }
                </div>
            </div>
            :null
        }
        {
            isPostLikesOpen && <PostLikeList setIstPostLikesOpen={setIstPostLikesOpen} />
        }
        </>
     );
}
 
export default PostInfo;