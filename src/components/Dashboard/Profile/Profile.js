import './Profile.css';

import coverPhoto from './benz.jpg'

import ProfileNavbar from './Profile-navbar/ProfileNavbar';

const Profile = () => {
    return ( 
        <div className="profile">
            <div className="profile-upper-side">
                <div className="profile-pictures">
                    <img src={coverPhoto} alt="B" className="profile-cover-photo"/>
                    <img src={coverPhoto} alt="P" className="profile-picture"/>
                </div>
                <span className="profile-name">Sis Nikoyan</span>
                <div className="profile-navigation">
                    <ProfileNavbar />
                </div>
            </div>
        </div>
     );
}
 
export default Profile;