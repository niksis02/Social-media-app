import { createContext, useState } from "react";

export const ProfileContext = createContext({
    posts: []
});

export const ProfileProvider = props => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState(null);
    const [birth, setBirth] = useState({});
    const [posts, setPosts] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [postImages, setPostImages] = useState([]);

    return (
        <ProfileContext.Provider value={{
            name, setName,
            surname, setSurname,
            gender, setGender,
            birth, setBirth,
            posts, setPosts,
            profilePhoto, setProfilePhoto,
            coverPhoto, setCoverPhoto,
            loading, setLoading,
            userInfo, setUserInfo,
            postImages, setPostImages
        }}>
            {props.children}
        </ProfileContext.Provider>
    );
}
