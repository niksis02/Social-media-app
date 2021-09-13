import { useContext } from 'react';

import { ProfileContext } from '../../../../Contexts/ProfileContext';
import Post from '../../Post/Post';

import './ProfileFeed.css';

const ProfileFeed = () => {
    const {
        posts,
        userInfo,
        postImages
    } = useContext(ProfileContext);
    
    return ( 
        <div className="profile-feed">
            {
                posts.length !== 0 || !userInfo ? posts.map(post => {
                    const postImage = postImages.find(image => image.postId === post._id);
                    return<Post post={post} userInfo={userInfo} postImage={postImage} key={post._id} />
                }): <h1>No Posts available yet</h1>
            }
        </div>
     );
}
 
export default ProfileFeed;