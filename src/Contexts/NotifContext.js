import { createContext, useEffect, useState } from "react";

//import useFetchWithTimeout from "../Hooks/useFetchWithTimeout";

export const NotifContext = createContext(null);

export const NotifProvider = ({children, setNotifNumber}) => {
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    async function fetchWithTimeout(url, options = {}) {
        const { timeout = 10000 } = options;
    
        const controller = new AbortController();
        const timerId = setTimeout(() => {controller.abort()}, timeout);
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timerId);
        return response;
    }

    async function notifLongPoll() {
        let isThereError = false;
        while(true) {
            console.log('fetching long poll');
            try {
                const response = await fetchWithTimeout('http://localhost:5000/users/notifications/getRealTime', {
                    headers: {
                        'authorization': token
                    }
                });
                const notif = await response.json();
                setNotifNumber(notifNumber => notifNumber + 1);
            }
            catch(err) {
                if(!(err.name === 'AbortError')) {
                    isThereError = true;
                    setError(err.message);
                }
            }
            if(isThereError) {
                break;
            }
        }
    }

    useEffect(() => {
        notifLongPoll()
    }, [])

    return(
        <NotifContext.Provider value={{error}}>
            {children}
        </NotifContext.Provider>
    )
}