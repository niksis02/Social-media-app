import { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../Assets/Pictures/logo.svg';
import chat from '../../../Assets/Pictures/chat.svg';
import notif from '../../../Assets/Pictures/notif.svg';
import arrow from '../../../Assets/Pictures/arrow.svg';

import UserSearchBar from './Search bar/UserSearchBar';
import { DashboardContext } from '../Dashboard';

import './Navbar.css';

const Navbar = () => {
    const { user } = useContext(DashboardContext);

    return ( 
        <>
            <div className="navbar-container">
                <div className="navbar">
                    <Link to="/"><img src={logo} alt="N" className="logo" /></Link>
                    <UserSearchBar />
                    <ul className="navbar-menu">
                        <Link to={`/user-${user._id}`} className="navbar-profile-part">
                            <li><img src={user.profilePic} alt="ProfilePic" />{user.name}</li>
                        </Link>
                        <li><img src={chat} alt="Messenger" /></li>
                        <li><img src={notif} alt="Notifications" /></li>
                        <li><img src={arrow} alt="Account" /></li>
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Navbar;