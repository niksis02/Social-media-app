import { useMemo } from 'react';

import useScrollFetch from '../../../../Hooks/useScrollFetch';

import './MessengerNavigator.css';

const MessengerNavigator = () => {

    const body = useMemo(() => {
        return {};
    }, []);

    const { data, loading, pageHandler } = useScrollFetch('http://localhost:5000/users/messages/get/chats', body, 'post');

    return ( 
        <div className="messenger-navigator">
            
        </div>
     );
}
 
export default MessengerNavigator;