import { useState } from 'react';

import './Navbar.css';

import logo from '../../../Assets/Pictures/logo.svg';
import chat from '../../../Assets/Pictures/chat.svg';
import notif from '../../../Assets/Pictures/notif.svg';
import arrow from '../../../Assets/Pictures/arrow.svg';
import search from '../../../Assets/Pictures/search.svg';

const Navbar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(!isSearchFocused);
    }

    return ( 
        <>
            <div className="navbar-container"></div>
            <div className="navbar">
                <img src={logo} alt="N" className="logo" />
                <label className="search">
                {
                    !isSearchFocused ? <img src={search} alt="N" /> : null
                }
                    <input type="text" placeholder="Search..." className="searchBar" onFocus={handleSearchFocus} onBlur={handleSearchFocus}/>
                </label>
                <ul className="navbar-menu">
                    <li><img src="" alt="P" />Sis</li>
                    <li><img src={chat} alt="M" /></li>
                    <li><img src={notif} alt="U" /></li>
                    <li><img src={arrow} alt="Set" /></li>
                </ul>
            </div>
        </>
     );
}
 
export default Navbar;