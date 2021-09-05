import { useRef, useState } from 'react';

import './PostAppender.css';

import imageIcon from '../../../../Assets/Pictures/gallery.svg';
import xIcon from '../../../../Assets/Pictures/xIcon.svg';

const PostAppender = ({setIsPostAppenderOpen}) => {
    const [postPhoto, setPostPhoto] = useState(null);
    const [postContent, setPostContent] = useState("");

    const handleOpen = e => {
        if(e.target === windowRef.current) {
           setIsPostAppenderOpen(false);
        }
    }

    const uploaderRef = useRef();
    const windowRef = useRef();

    const handleFileUpload = e => {
        setPostPhoto(URL.createObjectURL(e.target.files[0]));
    }

    return (  
        <div className="post-appender-background" onClick={handleOpen} ref={windowRef}>
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
                    {postPhoto? <img src={postPhoto} alt="Photo" />: null}
                </div>
                <div className="post-appender-footer">
                    <span>Add to your post</span>
                    <img src={imageIcon} alt="Image" onClick={() => {uploaderRef.current.click()}} />
                </div>
                <button className="post-appender-submit">Post</button>
                <input type="file" ref={uploaderRef} hidden onChange={handleFileUpload} />
            </div>
        </div>
    );
}
 
export default PostAppender;