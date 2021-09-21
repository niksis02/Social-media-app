import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

import logo from '../../../Assets/Pictures/logo.svg';
import chat from '../../../Assets/Pictures/chat.svg';
import notif from '../../../Assets/Pictures/notif.svg';
import arrow from '../../../Assets/Pictures/arrow.svg';
import search from '../../../Assets/Pictures/search.svg';

import SearchResult from './SearchResult/SearchResult';

const Navbar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(!isSearchFocused);
    }

    return ( 
        <>
            <div className="navbar-container"></div>
            <div className="navbar">
                <Link to="/"><img src={logo} alt="N" className="logo" /></Link>
                <label className="search">
                {
                    !isSearchFocused ? <img src={search} alt="N" /> : null
                }
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="searchBar" 
                        onFocus={handleSearchFocus} 
                        onBlur={handleSearchFocus}
                    />
                    <SearchResult />
                </label>
                <ul className="navbar-menu">
                    <Link to="/profile"><li><img src="" alt="P" />Sis</li></Link>
                    <li><img src={chat} alt="M" /></li>
                    <li><img src={notif} alt="U" /></li>
                    <li><img src={arrow} alt="Set" /></li>
                </ul>
            </div>
        </>
     );
}
 
export default Navbar;