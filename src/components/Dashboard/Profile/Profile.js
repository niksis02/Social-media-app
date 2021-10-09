import { useParams, Switch, Route } from 'react-router-dom';
import { createContext, useMemo } from 'react';

import About from './About/About';
import ProfilePhotos from './ProfilePhotos/ProfilePhotos';
import FriendList from './FriendList/FriendList';
import ProfileFeed from './Profile-feed/ProfileFeed';
import ProfileHeader from './Profile-header/ProfileHeader';
import useFetch from '../../../Hooks/useFetch';
import Loading from '../../Common/Loading/Loading';


import ProfPicMale from '../../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../../Assets/Pictures/profile_female.png';


import './Profile.css';

export const ProfileContext = createContext({});

const Profile = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');

    const { data, loading, error } = useFetch('http://localhost:5000/users/getUser', token, id);

    const user = useMemo(() => {
        if(!data.profilePic) {
            data.profilePic = data.gender? ProfPicMale: ProfPicFemale;
        }
        if(!data.coverPic) {
            data.coverPic = null;
        }
        data.host = data.hostId === id;
        return data;
    }, [data, id]);

    console.log(user);
    
    return ( 
        <>
            {user && user.name && 
                <ProfileContext.Provider value={{user, id, loading, error}}>
                    <div className="profile">
                    {!loading ?
                        <>
                            <div className="profile-upper-side">
                                <ProfileHeader />
                            </div>
                            <div className="profile-lower-side">
                                <Switch>
                                    <Route exact path={`/user-${id}/about`} component={About} />
                                    <Route exact path={`/user-${id}/friends`} component={FriendList} />
                                    <Route exact path={`/user-${id}/photos`} component={ProfilePhotos} />
                                    <Route exact path={`/user-${id}`} component={ProfileFeed} />
                                </Switch>
                            </div>
                        </>
                        :<Loading size={'150px'} />
                    }
                    </div>
                </ProfileContext.Provider>
            }
        </>
     );
}
 
export default Profile;