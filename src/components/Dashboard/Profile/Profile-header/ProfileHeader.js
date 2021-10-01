import { useContext } from 'react';
import { useParams } from 'react-router';

import { ProfileContext } from '../Profile';
import ProfileNavbar from '../Profile-navbar/ProfileNavbar';

import './ProfileHeader.css';

const ProfileHeader = () => {
    const { user } = useContext(ProfileContext);

    const { id } = useParams();


    return ( 
        <>
            <div className="profile-pictures">
                <div className="profile-cover-photo-background">
                    {user.coverPic?<img src={user.coverPic} alt="B" className="profile-cover-photo"/>: null}
                </div>
                <img src={user.profilePic} alt="P" className="profile-picture"/>
            </div>
            <span className="profile-name">{user.name + ' ' + user.surname}</span>
            <div className="profile-navigation">
                <ProfileNavbar id={id} />
            </div>
        </>
     );
}
 
export default ProfileHeader;