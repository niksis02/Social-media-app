import { useContext, useMemo, useRef, useEffect } from 'react';

import { ProfileContext } from '../Profile';
import Post from '../../Post/Post';
import useScrollFetch from '../../../../Hooks/useScrollFetch';
import InfiniteScroll from '../../../../Helpers/InfiniteScroll';
import Loading from '../../../Common/Loading/Loading';

import './ProfileFeed.css';

const ProfileFeed = () => {
    const feedRef = useRef();
    const { user, id } = useContext(ProfileContext);

    const body = useMemo(() => ({id}), [id]);

    const { data, loading, error, setData, setPage, pageHandler } = useScrollFetch('http://localhost:5000/users/posts/getProfileFeed', body, 'post');

    useEffect(() => {
        setPage(-1);
        setData([]);
    }, [id, setData]);

    const posts = useMemo(() => {
        data.forEach(elem => {
            elem.authorProfPic = user.profilePic;
            elem.authorCoverPic = user.coverPic;
            elem.authorName = user.name;
            elem.authorSurname = user.surname;
            elem.authorGender = user.gender;
            elem.hostId = user.hostId;
            elem.host = user.host;
            elem.hostProfPic = user.profilePic;
        });
        return data;
    }, [user, data]);


    return ( 
        <div className="profile-feed" ref={feedRef}>
            <InfiniteScroll containerRef={feedRef.current} cb={pageHandler}>
                {
                    posts && posts.length !== 0 ? posts.map(post => {
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
 
export default ProfileFeed;