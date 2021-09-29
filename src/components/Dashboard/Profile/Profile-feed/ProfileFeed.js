import { useContext, useMemo, useState } from 'react';

import { ProfileContext } from '../../../../Contexts/ProfileContext';
import Post from '../../Post/Post';

import ProfPicMale from '../../../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../../../Assets/Pictures/profile_female.png';


import './ProfileFeed.css';

const ProfileFeed = () => {
    const { data } = useContext(ProfileContext);
    const [comingPost, setComingPost] = useState(data.posts);
    console.log('data:', data, 'comingPost:', comingPost);

    const posts = useMemo(() => {
        if(!data.profilePic) {
            data.profilePic = data.gender? ProfPicMale: ProfPicFemale;
            comingPost && comingPost.map(elem => {
                return elem.authorProfPic  = data.gender? ProfPicMale: ProfPicFemale;
            });
        }
        if(!data.coverPic) {
            data.coverPic = null;
        }

        comingPost && comingPost.forEach(elem => {
            elem.authorProfPic = data.profilePic;
            elem.authorCoverPic = data.coverPic;
            elem.authorName = data.name;
            elem.authorSurname = data.surname;
            elem.authorGender = data.gender;
            elem.hostId = data.hostId;
        });

        return comingPost;
    }, [comingPost])
    
    console.log('posts:', posts);

    return ( 
        <div className="profile-feed">
            {
                // posts && posts.length !== 0 ? posts.map(post => {
                //     return <Post post={post} key={post._id} />
                // }): <h1>No Posts available yet</h1>
            }
        </div>
     );
}
 
export default ProfileFeed;