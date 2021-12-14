import { useContext, useEffect, useMemo, useState } from 'react';

import OnlineFriend from './OnlineFriend/OnlineFriend';
import useFetch from '../../../../Hooks/useFetch';
import { DashboardContext } from '../../../../Contexts/DashboardContext';

import ProfPicFemale from '../../../../Assets/Pictures/profile_female.png';
import ProfPicMale from '../../../../Assets/Pictures/profile_male.png';

import './OnlineFriendList.css';

const OnlineFriendList = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { currentUser, socket } = useContext(DashboardContext);

    const body = useMemo(() => {
        return {friendIds: onlineUsers};
    }, [onlineUsers]);

    const { data, loading, error } = useFetch('http://localhost:5000/users/friends/get/online', body, 'post');

    const onlineFriends = useMemo(() => {
        Array.isArray(data) && data.forEach(elem => {
            if(!elem.profilePic) {
                elem.profilePic = elem.gender? ProfPicMale: ProfPicFemale;
            }
        })
        return data;
    }, [data]);
    

    useEffect(() => {
        socket.current?.emit('addUser', currentUser._id);
        socket.current?.on('getUsers', users => {
            setOnlineUsers(
                currentUser.friends?.filter(user => users.some(u => u.userId === user))
            );
        });
    }, [currentUser, socket]);

    return ( 
        <div className="online-friend-list">
            {onlineFriends?.length > 0 ?
                onlineFriends.map(friend => {
                    return <OnlineFriend user={friend} key={friend._id} />
                }): 
                <h1>No online users</h1>
            }
        </div>
     );
}
 
export default OnlineFriendList;