import { useState, useRef } from 'react';

import search from '../../../../Assets/Pictures/search.svg';

import SearchResult from './SearchResult/SearchResult';
import useSearchFetch from '../../../../Helpers/useSearchFetch';
import useClickChecker from '../../../../Helpers/useClickChecker';

import './UserSearchBar.css'

const UserSearchBar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const {data, loading, error} = useSearchFetch('http://localhost:5000/users/search', query, page);
    const searchResultRef = useRef(null);
    const { outside, setOutside } = useClickChecker(searchResultRef);

    const handleSearchFocus = () => {
        setIsSearchFocused(!isSearchFocused);
        setOutside(false);
    }
    const handleQuery = e => {
        setQuery(e.target.value);
        setOutside(false);
        setPage(0);
    }

    return ( 
        <label className="search">
            {
                !isSearchFocused ? <img src={search} alt="N" /> : null
            }
            <input 
                type="text" 
                placeholder="Search..." 
                className="searchBar" 
                value={query}
                onChange={handleQuery}
                onFocus={handleSearchFocus} 
                onBlur={() => {setIsSearchFocused(!isSearchFocused)}}
            />
            {data.length !== 0 && !outside && 
            <SearchResult 
                ref={searchResultRef}
                data={data} 
                loading={loading}
                error={error}
                setPage={setPage}
                setOutside={setOutside}
            />}
        </label>
     );
}
 
export default UserSearchBar;