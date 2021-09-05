import { useState } from 'react';
import './ProfileNavbar.css'

const ProfileNavbar = () => {
    const [animController, setAnimController] = useState(1);

    const handleAnim = num => {
        setAnimController(num);
    }

    return (  
        <div className="profile-navbar">
            <div className="profile-posts-button">
                <button 
                    style={{color: animController === 1? '#2DCC70':'#747679'}}
                    onClick={() => {handleAnim(1)}}
                >Posts</button>
                {animController === 1? <div></div>:null}
            </div>
            <div className="profile-about-button">
                <button
                    style={{color: animController === 2? '#2DCC70':'#747679'}}
                    onClick={() => {handleAnim(2)}}
                    >About</button>
                {animController === 2? <div></div>:null}
            </div>
            <div className="profile-friends-button">
                <button
                    style={{color: animController === 3? '#2DCC70':'#747679'}}
                    onClick={() => {handleAnim(3)}}
                    >Friends</button>
                {animController === 3? <div></div>:null}
            </div>
            <div className="profile-photos-button">
                <button 
                    style={{color: animController === 4? '#2DCC70':'#747679'}} 
                    onClick={() => {handleAnim(4)}}
                    >Photos</button>
                {animController === 4? <div></div>:null}
            </div>
        </div>
    );
}
 
export default ProfileNavbar;