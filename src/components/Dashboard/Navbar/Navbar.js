import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../Assets/Pictures/Nikoyan.svg';
import chat from '../../../Assets/Pictures/chat.svg';
import notif from '../../../Assets/Pictures/notif.svg';
import arrow from '../../../Assets/Pictures/arrow.svg';

import UserSearchBar from './Search bar/UserSearchBar';
import MessengerNavigator from './Messenger/MessengerNavigator';
import Notifications from './Notifications/Notifications';
import Account from './Account/Account';
import { DashboardContext } from '../../../Contexts/DashboardContext';
import { NotifProvider } from '../../../Contexts/NotifContext';

import './Navbar.css';

const Navbar = () => {
    const { currentUser } = useContext(DashboardContext);
    const [navController, setNavController] = useState(0);
    const [notifNumber, setNotifNumber] = useState(currentUser.notifNumber);
    const accountRef = useRef();

    const handleController = (num) => {
        if(navController === num) {
            setNavController(-1 * navController);
        } 
        else{
            setNavController(num);
        }
    }

    return ( 
        <>
            <div className="navbar-container">
                <div className="navbar">
                    <Link to="/"><img src={logo} alt="N" className="logo" /></Link>
                    <UserSearchBar />
                    <ul className="navbar-menu">
                        <Link to={`/user-${currentUser._id}`} className="navbar-profile-part">
                            <li><img src={currentUser.profilePic} alt="ProfilePic" />{currentUser.name}</li>
                        </Link>
                        <li onClick={() => handleController(1)}>
                            <img src={chat} alt="Messenger" />
                        </li>
                        <li onClick={() => handleController(2)} className="notification-icon">
                            {notifNumber > 0 && 
                            <div className="notifNumber">
                                <span>{notifNumber}</span>
                            </div>}
                            <img src={notif} alt="Notifications" />
                        </li>
                        <li onClick={() => handleController(3)} ref={accountRef}>
                            <img src={arrow} alt="Account" />
                        </li>
                    </ul>
                    <NotifProvider setNotifNumber={setNotifNumber}>
                        {
                            navController > 0 && 
                            <ul className="navbar-right-part-container">
                                {navController === 1 && <MessengerNavigator />}
                                {navController === 2 && <Notifications setNotifNumber={setNotifNumber} />}
                                {navController === 3 && <Account />}
                            </ul>
                        }
                    </NotifProvider>
                </div>
            </div>
        </>
     );
}
 
export default Navbar;