import { useParams, Switch, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import profilePhotoMale from '../../../Assets/Pictures/profile_male.png';
import profilePhotoFemale from '../../../Assets/Pictures/profile_female.png';

import About from './About/About';
import ProfilePhotos from './ProfilePhotos/ProfilePhotos';
import FriendList from './FriendList/FriendList';
import ProfileFeed from './Profile-feed/ProfileFeed';
import ProfileHeader from './Profile-header/ProfileHeader';
import Loading from '../../Loading/Loading';

import { ProfileContext } from '../../../Contexts/ProfileContext';

import './Profile.css';

const Profile = () => {
    const {
        setName,
        setSurname,
        setProfilePhoto,
        setCoverPhoto, 
        setUserInfo,
        loading, setLoading,
        setPosts,
        setPostImages
    } = useContext(ProfileContext);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try{
                setLoading(true);
                const json = await fetch('http://localhost:5000/users/getUser', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id
                    })
                });
                const res = await json.json();
                const data = res.msg;

                const profilePic = data.images.find(image => image.profilePhoto);
                const coverPic = data.images.find(image => image.coverPhoto);

                setPosts(data.posts);
                setProfilePhoto(profilePic.imageURL? profilePic.imageURL: data.gender?profilePhotoMale:profilePhotoFemale);
                setName(data.name);
                setSurname(data.surname);
                setCoverPhoto(coverPic.imageURL);
                setPostImages(data.images);
                setUserInfo({
                    name: data.name,
                    surname: data.surname,
                    profilePhoto: profilePic.imageURL? profilePic.imageURL: data.gender?profilePhotoMale:profilePhotoFemale,
                    coverPhoto: coverPic.imageURL
                });
                setLoading(false);
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
                <ProfileHeader />
            </div>
            {loading? <Loading />:
                <div className="profile-lower-side">
                    <Switch>
                        <Route exact path={`/user-${id}/about`} component={About} />
                        <Route exact path={`/user-${id}/friends`} component={FriendList} />
                        <Route exact path={`/user-${id}/photos`} component={ProfilePhotos} />
                        <Route exact path={`/user-${id}`} component={ProfileFeed} />
                    </Switch>
                </div>
            }
        </div>
     );
}
 
export default Profile;