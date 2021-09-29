import { useContext } from 'react';
import { useParams } from 'react-router';
import { ProfileContext } from '../../../../Contexts/ProfileContext';

import ProfileNavbar from '../Profile-navbar/ProfileNavbar';

import './ProfileHeader.css';

const ProfileHeader = () => {
    const { data } = useContext(ProfileContext);

    const { id } = useParams();


    return ( 
        <>
            <div className="profile-pictures">
                <div className="profile-cover-photo-background">
                    {data.coverPic?<img src={data.coverPic} alt="B" className="profile-cover-photo"/>: null}
                </div>
                <img src={data.profilePic} alt="P" className="profile-picture"/>
            </div>
            <span className="profile-name">{data.name + ' ' + data.surname}</span>
            <div className="profile-navigation">
                <ProfileNavbar id={id} />
            </div>
        </>
     );
}
 
export default ProfileHeader;