import { useContext } from 'react';

import { PostContext } from '../Post';

import './PostContent.css';

const PostContent = () => {
    const { post } = useContext(PostContext);
    
    return ( 
        <div className="post-content">
            <span>{post.content}</span>
        </div>
     );
}
 
export default PostContent;