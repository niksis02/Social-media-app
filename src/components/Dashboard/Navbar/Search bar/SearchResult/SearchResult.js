import { useRef } from 'react';

import InfiniteScroll from '../../../../../Helpers/InfiniteScroll'
import UserSearchItem from './User-search-item/UserSearchItem';

import './SearchResult.css';

const SearchResult = ({data, loading, error, setPage}) => {
    const containerRef = useRef();

    return ( 
        <div className="search-result" ref={containerRef}>
            <InfiniteScroll 
                containerRef={containerRef.current}
                setPage={setPage}
            >
                <ul>
                    {data.length !== 0 && 
                        data.map((user) => {
                            return <UserSearchItem user={user} key={user._id} />
                        })
                    }
                </ul>
            </InfiniteScroll>
        </div>
     );
}
 
export default SearchResult;