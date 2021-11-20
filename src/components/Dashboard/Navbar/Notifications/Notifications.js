import { useMemo } from 'react';

import Notif from './Notif/Notif';
import Loading from '../../../Common/Loading/Loading';
import InfiniteScroll from '../../../../Helpers/InfiniteScroll';
import useScrollFetch from '../../../../Hooks/useScrollFetch';

import ProfPicMale from '../../../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../../../Assets/Pictures/profile_female.png';

import './Notifications.css';

const Notifications = ({ setNotifNumber }) => {
    const body = useMemo(() => ({}), []);

    const { data, loading, pageHandler } = useScrollFetch('http://localhost:5000/users/notifications/getAll', body, 'post');

    const notifs = useMemo(() => {
        data.length > 0 && data.forEach(elem => {
            if(!elem.requesterProfPic) {
                elem.requesterProfPic = elem.requesterUserGender? ProfPicMale: ProfPicFemale;
            }
        })
        return data;
    }, [data]);

    return (
        <>
            <InfiniteScroll cb={pageHandler}>
                {
                    notifs && notifs.length > 0 ?
                    notifs.map(notif => {
                        return <Notif setNotifNumber={setNotifNumber} notif={notif} key={notif._id} />
                    })
                    : <h2>There are no notifications to display</h2>
                }
                {
                    loading && <Loading size={'50px'} />
                }
            </InfiniteScroll>
        </>
     );
}
 
export default Notifications;