import { useContext, useMemo, useRef } from 'react';

import InfiniteScroll from '../../../../../Helpers/InfiniteScroll';
import PostLikeListItem from './Post-like-list-item/PostLikeListItem';
import useScrollFetch from '../../../../../Hooks/useScrollFetch';
import { PostContext } from '../../Post';
import Loading from '../../../../Common/Loading/Loading';

import { ReactComponent as LikeIcon } from '../../../../../Assets/Pictures/likeIcon.svg';
import { ReactComponent as XIcon } from '../../../../../Assets/Pictures/xIcon.svg';
import ProfPicMale from '../../../../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../../../../Assets/Pictures/profile_female.png';

import './PostLikeList.css';

const PostLikeList = ({ setIstPostLikesOpen }) => {
    const backgroundRef = useRef(null);
    const { post } = useContext(PostContext);

    const handleOpen = e => {
        if(e.target === backgroundRef.current) {
            setIstPostLikesOpen(false);
        }
    }

    const body = useMemo(() => {
        return {
            postId: post._id
        }
    }, [post]);

    const { data, loading, error, pageHandler } = useScrollFetch('http://localhost:5000/users/posts/likes/getAll', body, 'post');

    const likeUsers = useMemo(() => {
        data?.forEach(elem => {
            if(!elem.profilePic) {
                elem.profilePic = elem.gender? ProfPicMale: ProfPicFemale;
            }
        });
        return data;
    }, [data]);

    return ( 
        <div className="post-likes-list-background" ref={backgroundRef} onClick={e => { handleOpen(e) }}>
            <div className="post-likes-list" >
                <div className="post-likes-list-header">
                    <div className="post-likes-list-like" >
                        <LikeIcon fill="#2DCC70" />
                        <span>{likeUsers?.length}</span>
                    </div>
                    <div className="post-likes-list-x-icon" >
                        <XIcon fill="#606770" onClick={() => { setIstPostLikesOpen(false)}} />
                    </div>
                </div>
                <div className="post-likes-list-items">
                    <InfiniteScroll cb={pageHandler}>
                        {
                            likeUsers?.map(user => {
                                return <PostLikeListItem user={user} key={user._id} />
                            })
                        }
                        {
                            loading && <Loading size={'20px'} />
                        }
                    </InfiniteScroll>
                </div>
            </div>
        </div>
     );
}
 
export default PostLikeList;