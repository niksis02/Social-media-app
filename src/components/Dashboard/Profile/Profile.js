import { useParams, Switch, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import About from './About/About';
import ProfilePhotos from './ProfilePhotos/ProfilePhotos';
import FriendList from './FriendList/FriendList';
import ProfileFeed from './Profile-feed/ProfileFeed';
import ProfileHeader from './Profile-header/ProfileHeader';
import Loading from '../../Loading/Loading';

import { ProfileContext } from '../../../Contexts/ProfileContext';

import './Profile.css';

const Profile = () => {
    const { data, setData } = useContext(ProfileContext);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            try{
                setLoading(true);
                const response = await fetch('http://localhost:5000/users/getUser', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify({
                        id
                    })
                });
                const result = await response.json();
                setLoading(false);

                if(result.status === 'error') {
                    console.log(result.msg);
                }
                if(result.status === 'ok') {
                    setData(result.msg);
                    console.log(result.msg);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id])
    
    return ( 
        <div className="profile">
            {data? 
                <>
                    <div className="profile-upper-side">
                        <ProfileHeader />
                    </div>
                    <div className="profile-lower-side">
                        <Switch>
                            <Route exact path={`/user-${id}/about`} component={About} />
                            <Route exact path={`/user-${id}/friends`} component={FriendList} />
                            <Route exact path={`/user-${id}/photos`} component={ProfilePhotos} />
                            {data && <Route exact path={`/user-${id}`} component={ProfileFeed} />}
                        </Switch>
                    </div>
                </>: <Loading />
            }
        </div>
     );
}
 
export default Profile;