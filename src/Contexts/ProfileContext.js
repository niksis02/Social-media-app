import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = props => {
    const [data, setData] = useState({});

    return (
        <ProfileContext.Provider value={{
            data, setData
        }}>
            {props.children}
        </ProfileContext.Provider>
    );
}
