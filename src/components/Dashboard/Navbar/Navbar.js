import { Link } from 'react-router-dom';

import './Navbar.css';

import logo from '../../../Assets/Pictures/logo.svg';
import chat from '../../../Assets/Pictures/chat.svg';
import notif from '../../../Assets/Pictures/notif.svg';
import arrow from '../../../Assets/Pictures/arrow.svg';

import UserSearchBar from './Search bar/UserSearchBar';

const Navbar = () => {

    return ( 
        <>
            <div className="navbar-container">
                <div className="navbar">
                    <Link to="/"><img src={logo} alt="N" className="logo" /></Link>
                    <UserSearchBar />
                    <ul className="navbar-menu">
                        <Link to="/profile"><li><img src="" alt="P" />Sis</li></Link>
                        <li><img src={chat} alt="M" /></li>
                        <li><img src={notif} alt="U" /></li>
                        <li><img src={arrow} alt="Set" /></li>
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Navbar;