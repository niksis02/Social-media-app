import { useContext } from 'react';
import { useParams } from 'react-router';
import { ProfileContext } from '../../../../Contexts/ProfileContext';

import ProfileNavbar from '../Profile-navbar/ProfileNavbar';

import './ProfileHeader.css';

const ProfileHeader = () => {
    const {
        name, 
        surname, 
        profilePhoto, 
        coverPhoto
    } = useContext(ProfileContext);

    const { id } = useParams();


    return ( 
        <>
            <div className="profile-pictures">
                <div className="profile-cover-photo-background">
                    {coverPhoto?<img src={coverPhoto} alt="B" className="profile-cover-photo"/>: null}
                </div>
                <img src={profilePhoto} alt="P" className="profile-picture"/>
            </div>
            <span className="profile-name">{name + ' ' + surname}</span>
            <div className="profile-navigation">
                <ProfileNavbar id={id} />
            </div>
        </>
     );
}
 
export default ProfileHeader;