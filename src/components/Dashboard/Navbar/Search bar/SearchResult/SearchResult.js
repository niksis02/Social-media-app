import { forwardRef } from 'react';

import InfiniteScroll from '../../../../../Helpers/InfiniteScroll';
import UserSearchItem from './User-search-item/UserSearchItem';

import './SearchResult.css';

const SearchResult = ({data, loading, error, setPage, setOutside}, ref) => {

    return ( 
        <div className="search-result" ref={ref}>
            <InfiniteScroll 
                containerRef={ref.current}
                setPage={setPage}
            >
                <ul>
                    {data.length !== 0 && 
                        data.map((user) => {
                            return <UserSearchItem user={user} key={user._id} setOutside={setOutside} />
                        })
                    }
                </ul>
            </InfiniteScroll>
        </div>
     );
}
 
export default forwardRef(SearchResult);