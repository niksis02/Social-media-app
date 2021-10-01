import { useRef, useState } from 'react';

import imageIcon from '../../../../Assets/Pictures/gallery.svg';
import xIcon from '../../../../Assets/Pictures/xIcon.svg';

import Loading from '../../../Loading/Loading';

import './PostAppender.css';

const PostAppender = ({setIsPostAppenderOpen}) => {
    const [imageURL, setImageURL] = useState(null);
    const [pickedImage, setPickedImage] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [loading, setLoading] = useState(false);

    const uploaderRef = useRef();
    const windowRef = useRef();

    const handleOpen = e => {
        if(e.target === windowRef.current) {
           setIsPostAppenderOpen(false);
        }
    }

    const handleFileUpload = file => {
        setImageURL(URL.createObjectURL(file));
        setPickedImage(file);
    }

    const handlePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const token = localStorage.getItem('token')
        formData.append('image', pickedImage);
        formData.append('content', postContent);
        const response = await fetch('http://localhost:5000/users/posts/add', {
            method: 'post',
            headers: {
                "Authorization": token,
                "Accept": "application/json"
            },
            body: formData
        });
        const data = await response.json();
        setIsPostAppenderOpen(false);
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
                    { loading?<Loading />:imageURL? <img src={imageURL} alt="" />: null}
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