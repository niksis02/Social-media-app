import { useState } from 'react';

import './AddPostButton.css';

import PostAppender from './PostAppender/PostAppender';
import addIcon from '../../../Assets/Pictures/addPost.svg';

const AddPostButton = () => {
    const [isPostAppenderOpen, setIsPostAppenderOpen] = useState(false);

    return ( 
        <div className="add-post">
            <div className="add-post-button" onClick={() => {setIsPostAppenderOpen(true)}}>
                <img src={addIcon} alt="A" />
                <span>Add post</span>
            </div>
            {isPostAppenderOpen?<PostAppender setIsPostAppenderOpen={setIsPostAppenderOpen} />: null}
        </div>
     );
}
 
export default AddPostButton;