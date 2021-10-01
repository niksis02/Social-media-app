import { createContext, useState } from 'react';

import PostHeader from './Post-header/PostHeader';
import PostPhoto from './Post-photo/PostPhoto';
import PostInfo from './Post-info/PostInfo';
import PostButtons from './Post-buttons/PostButtons';
import PostCommentInput from './Post-comment-input/PostCommentInput';
import PostContent from './Post-content/PostContent';

import './Post.css';

export const PostContext = createContext();

const Post = ({post}) => {
    const [likes, setLikes] = useState(post.likes);
    
    return ( 
        <PostContext.Provider value={{post, likes, setLikes }}>
            <div className="post">
                <PostHeader />
                <PostContent />
                <PostPhoto />
                <PostInfo />
                <PostButtons />
                <PostCommentInput />
            </div>
        </PostContext.Provider>
     );
}
 
export default Post;