import { createContext, useMemo, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';

import useFetch from "../Hooks/useFetch";

import ProfPicMale from '../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../Assets/Pictures/profile_female.png';

export const DashboardContext = createContext();

export const DashboardProvider = props => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [openChats, setOpenChats] = useState([]);
    const socket = useRef();

    const { data, loading, error } = useFetch('http://localhost:5000/users/user', null, 'get');
    
    const currentUser = useMemo(() => {
        if(!data?.profilePic) {
            data.profilePic = data?.gender? ProfPicMale: ProfPicFemale;
        }
        return data;
    }, [data]);

    function addOpenChat(user) {
        if(openChats.includes(user)) {
            return;
        }
        if(openChats.length === 4) {
            setOpenChats(chats => [...chats.filter((e, index) => index !== 0), user]);
        }
        else {
            setOpenChats(chats => [...chats, user]);
        }
    }

    useEffect(() => {
        socket.current = io('ws://localhost:5001');
        return () => {
            socket.current.disconnect();
        }
    }, [token]);

    return (
        <DashboardContext.Provider value={{ currentUser, loading, error, socket, openChats, setOpenChats, addOpenChat, setToken }}>
            {props.children}
        </DashboardContext.Provider>
    )
}