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
                        {post.authorCoverPhoto?<img src={post.authorCoverPhoto}></img>:null}
                    </div>
                    <img src={post.image} className='post-profile-photo' />
                </div>
                : <img src={post.image} className='post-photo' />
            }
        </div>
     );
}
 
export default PostPhoto;