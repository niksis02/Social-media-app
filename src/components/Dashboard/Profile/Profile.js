import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Profile.css';

import coverPhoto from './benz.jpg'

import ProfileNavbar from './Profile-navbar/ProfileNavbar';

const Profile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState(null);
    const [birth, setBirth] = useState({});
    const [posts, setPosts] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
                const json = await fetch('http://localhost:5000/users/getUser', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id
                        })
                    });
                const data = await json.json();
                console.log(data);
        }
        fetchData();
    }, [])

    return ( 
        <div className="profile">
            <div className="profile-upper-side">
                <div className="profile-pictures">
                    <img src={coverPhoto} alt="B" className="profile-cover-photo"/>
                    <img src={coverPhoto} alt="P" className="profile-picture"/>
                </div>
                <span className="profile-name">Sis Nikoyan</span>
                <div className="profile-navigation">
                    <ProfileNavbar />
                </div>
            </div>
        </div>
     );
}
 
export default Profile;