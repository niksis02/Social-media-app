import { useParams, Switch, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import profilePhotoMale from '../../../Assets/Pictures/profile_male.png';
import profilePhotoFemale from '../../../Assets/Pictures/profile_female.png';

import ProfileNavbar from './Profile-navbar/ProfileNavbar';
import About from './About/About';
import ProfilePhotos from './ProfilePhotos/ProfilePhotos';
import FriendList from './FriendList/FriendList';
import Loading from '../../Loading/Loading';

import { ProfileContext } from '../../../Contexts/ProfileContext';

import './Profile.css';

const Profile = () => {
    const {
        name, setName,
        surname, setSurname,
        profilePhoto, setProfilePhoto,
        coverPhoto, setCoverPhoto, 
        loading, setLoading,
        setPosts
    } = useContext(ProfileContext);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try{
                const json = await fetch('http://localhost:5000/users/getUser', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id
                        })
                    });
                const res = await json.json();
                const data = res.msg;
                setLoading(false);
                setProfilePhoto(data.profilePhoto? data.profilePhoto: data.gender?profilePhotoMale:profilePhotoFemale);
                setPosts(data.posts);
                setName(data.name);
                setSurname(data.surname);
                setCoverPhoto(data.coverPhoto);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])
    
    return ( 
        <div className="profile">
            <div className="profile-upper-side">
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
            </div>
            <Switch>
                <Route exact path={`/user-${id}/about`} component={About} />
                <Route exact path={`/user-${id}/friends`} component={FriendList} />
                <Route exact path={`/user-${id}/photos`} component={ProfilePhotos} />
            </Switch>
        </div>
     );
}
 
export default Profile;