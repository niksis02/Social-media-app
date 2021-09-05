import { useRef, useState } from 'react';

import './PostAppender.css';

import imageIcon from '../../../../Assets/Pictures/gallery.svg';
import xIcon from '../../../../Assets/Pictures/xIcon.svg';

import Loading from '../../../Loading/Loading';

const PostAppender = ({setIsPostAppenderOpen}) => {
    const [postPhotoURL, setPostPhotoURL] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const uploaderRef = useRef();
    const windowRef = useRef();

    const handleOpen = e => {
        if(e.target === windowRef.current) {
           setIsPostAppenderOpen(false);
        }
    }

    const handleFileUpload = async file => {
        const URL = 'https://api.cloudinary.com/v1_1/dy0ruizyw/image/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'vsxmvzn3');
        setLoading(true);

        try {
            const data = await fetch(URL, {
                method: 'post',
                body: formData
            })
            const json = await data.json();
            setPostPhotoURL(json.secure_url);
            setLoading(false);
        }
        catch(err) {
            setError(err.message);
        }
    }

    const handlePost = async e => {
        console.log(postPhotoURL, typeof(postPhotoURL));
    }

    return (  
        <div className="post-appender-background" onMouseDown={handleOpen} ref={windowRef}>
            <div className="post-appender">
                <div className="post-appender-header">
                    <span>Creat post</span>
                    <div onClick={() => {setIsPostAppenderOpen(false)}}><img src={xIcon} alt=""/></div>
                </div>
                <div className="post-appender-mid-part">
                    <div 
                        className="post-appender-content" 
                        contentEditable="true" 
                        placeholder="What's on your mind"
                        onBlur={e => setPostContent(e.target.textContent)}
                    >
                    </div>
                    { loading?<Loading />:postPhotoURL? <img src={postPhotoURL} alt="" />: null}
                </div>
                <div className="post-appender-footer">
                    <span>Add to your post</span>
                    <img src={imageIcon} alt="" onClick={() => {uploaderRef.current.click()}} />
                </div>
                <button className="post-appender-submit" onClick={(e) => {handlePost(e)}}>Post</button>
                <input type="file" ref={uploaderRef} hidden onChange={e => {handleFileUpload(e.target.files[0])}} />
            </div>
        </div>
    );
}
 
export default PostAppender;