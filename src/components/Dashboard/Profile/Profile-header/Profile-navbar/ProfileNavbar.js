import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './ProfileNavbar.css'

const ProfileNavbar = ({id}) => {
    const [animController, setAnimController] = useState(1);
    const history = useHistory();

    const handleAnim = num => {
        setAnimController(num);
    }

    function handleRoutes(route) {
        history.push(`/user-${id}/${route}`);
    }

    return (  
        <div className="profile-navbar">
            <div className="profile-posts-button">
                <button 
                    style={{color: animController === 1? '#2DCC70':'#747679'}}
                    onClick={() => {
                        handleAnim(1);
                        handleRoutes('');
                    }}
                >Posts</button>
                {animController === 1? <div></div>:null}
            </div>
            <div className="profile-about-button">
                <button
                    style={{color: animController === 2? '#2DCC70':'#747679'}}
                    onClick={() => {
                        handleAnim(2);
                        handleRoutes('about');
                    }}
                    >About</button>
                {animController === 2? <div></div>:null}
            </div>
            <div className="profile-friends-button">
                <button
                    style={{color: animController === 3? '#2DCC70':'#747679'}}
                    onClick={() => {
                        handleAnim(3);
                        handleRoutes('friends');
                    }}
                    >Friends</button>
                {animController === 3? <div></div>:null}
            </div>
            <div className="profile-photos-button">
                <button 
                    style={{color: animController === 4? '#2DCC70':'#747679'}} 
                    onClick={() => {
                        handleAnim(4);
                        handleRoutes('photos');
                    }}
                    >Photos</button>
                {animController === 4? <div></div>:null}
            </div>
        </div>
    );
}
 
export default ProfileNavbar;