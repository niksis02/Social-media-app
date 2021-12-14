import { useMemo, useContext } from 'react';

import AddPostButton from '../../../Common/Buttons/Add Button/AddPostButton';
import useScrollFetch from '../../../../Hooks/useScrollFetch';
import Post from '../../Post/Post';
import InfiniteScroll from '../../../../Helpers/InfiniteScroll';
import Loading from '../../../Common/Loading/Loading';
import { DashboardContext } from '../../../../Contexts/DashboardContext';

import ProfPicMale from '../../../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../../../Assets/Pictures/profile_female.png';

import './Feed.css';



const Feed = () => {
    const { currentUser } = useContext(DashboardContext);

    const body = useMemo(() => ({}), []);

    const { data, loading, pageHandler } = useScrollFetch('http://localhost:5000/users/feed', body, 'post');

    const feed = useMemo(() => {
        data.forEach(post => {
            post.host = post.hostId === post.userId;
            if(!post.authorProfPic) {
                post.authorProfPic = post.authorGender? ProfPicMale: ProfPicFemale;
            }
            if(!post.authorCoverPic) {
                post.authorCoverPic = null;
            }
            post.hostProfPic = currentUser.profilePic;
        });
        return data;
    }, [data]);

    return (  
        <div className="feed">
            <AddPostButton />
            <InfiniteScroll cb={pageHandler}>
                {
                    feed && feed.length !== 0 ? feed.map(post => {
                        return <Post post={post} key={post._id} />
                    }): <h1>No Posts available yet</h1>
                }
                {
                    loading && <Loading size={'80px'} />
                }
            </InfiniteScroll>
        </div>
    );
}
 
export default Feed;