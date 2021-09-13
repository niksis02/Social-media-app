import { useContext } from 'react';

import { PostContext } from '../Post';

import './PostPhoto.css';

const PostPhoto = () => {   
    const { userInfo, postImage } = useContext(PostContext);

    return ( 
        <div className="post-photo-container">
            {postImage.profilePhoto?
                <div className="post-profile-photo-container">
                    <div className="post-cover-photo-background">
                        {userInfo.coverPhoto?<img src={userInfo.coverPhoto}></img>:null}
                    </div>
                    <img src={postImage.imageURL} className='post-profile-photo' />
                </div>
                : <img src={postImage.imageURL} className='post-photo' />
            }
        </div>
     );
}
 
export default PostPhoto;