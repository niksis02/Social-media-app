import { useState, useEffect } from 'react';

import search from '../../../../Assets/Pictures/search.svg';

import SearchResult from './SearchResult/SearchResult';
import useFetch from '../../../../Helpers/useFetch';

import './UserSearchBar.css'

const UserSearchBar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const {data, loading, error} = useFetch('http://localhost:5000/users/search', query, page);

    const handleSearchFocus = () => {
        setIsSearchFocused(!isSearchFocused);
    }
    const handleQuery = e => {
        setQuery(e.target.value);
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
                onBlur={handleSearchFocus}
            />
            {data.length !== 0 && <SearchResult 
                data={data} 
                loading={loading}
                error={error}
                setPage={setPage}
            />}
        </label>
     );
}
 
export default UserSearchBar;