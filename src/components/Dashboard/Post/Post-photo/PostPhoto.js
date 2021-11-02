import { useContext } from 'react';

import { PostContext } from '../Post';

import './PostPhoto.css';

const PostPhoto = () => {   
    const { post } = useContext(PostContext);

    return ( 
        <div className="post-photo-container">
            {post.isProfPic?
                <div className="post-profile-photo-container">
                    <div className="post-cover-photo-background">
                        {post.authorCoverPic?<img src={post.authorCoverPic} alt="Cover Pic" ></img>:null}
                    </div>
                    <img src={post.image} alt="Post pic" className='post-profile-photo' />
                </div>
                : <img src={post.image} alt="Post pic" className='post-photo' />
            }
        </div>
     );
}
 
export default PostPhoto;