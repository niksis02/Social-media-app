import { useContext, useMemo, useState, useRef, useEffect } from 'react';

import { ProfileContext } from '../Profile';
import Post from '../../Post/Post';
import useScrollFetch from '../../../../Hooks/useScrollFetch';
import InfiniteScroll from '../../../../Helpers/InfiniteScroll';

import './ProfileFeed.css';

const ProfileFeed = () => {
    const [page, setPage] = useState(0);
    const feedRef = useRef();
    const { user, id } = useContext(ProfileContext);
    const { data, setData, loading, error } = useScrollFetch('http://localhost:5000/users/posts/getProfileFeed', page, id);

    useEffect(() => {
        setPage(0);
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
        });
        return data;
    }, [user, data]);

    console.log(posts[0]);

    return ( 
        <div className="profile-feed" ref={feedRef}>
            <InfiniteScroll setPage={setPage} containerRef={feedRef.current}>
                {
                    posts && posts.length !== 0 ? posts.map(post => {
                        return <Post post={post} key={post._id} />
                    }): <h1>No Posts available yet</h1>
                }
            </InfiniteScroll>
        </div>
     );
}
 
export default ProfileFeed;