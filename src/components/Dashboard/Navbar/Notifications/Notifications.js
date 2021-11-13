import { useMemo } from 'react';

import useFetch from '../../../../Hooks/useFetch';
import Notif from './Notif/Notif';
import Loading from '../../../Common/Loading/Loading';

import './Notifications.css';

const Notifications = () => {
    const body = useMemo(() => ({}), []);

    const { data: notifs, loading, error } = useFetch('http://localhost:5000/users/notifications', body, 'get');

    return (
        <>
            {
                !loading ?
                <ul className="notifications">
                    {
                        notifs && notifs.length > 0 ?
                        notifs.map(notif => {
                            return <Notif notif={notif} key={notif._id} />
                        })
                        : <h2>There are no notifications to display</h2>
                    }
                </ul>
                : <Loading size={'20px'} />
            }
        </>
     );
}
 
export default Notifications;