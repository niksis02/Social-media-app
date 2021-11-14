import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DashboardContext } from '../../Dashboard';

import settingsIcon from '../../../../Assets/Pictures/settings.svg';
import logOutIcon from '../../../../Assets/Pictures/logOut.svg';

import './Account.css';

const Account = () => {
    const { user } = useContext(DashboardContext);
    const history = useHistory()

    const handleLogOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return ( 
        <div className="account">
            <Link to={`/user-${user._id}`}>
                <li className="account-profile">
                    <img src={user.profilePic} alt="ProfilePicture" />
                    <div>
                        <span className="account-profile-name">{user.name + ' ' + user.surname}</span>
                        <span className="see-your-profile">See your profile</span>
                    </div>
                </li>
            </Link>
            <li className="account-settings">
                <div>
                    <img src={settingsIcon} alt="Settings" />
                </div>
                <span>Settings & Privacy</span>
            </li>
            <li className="account-log-out" onClick={handleLogOut}>
                <div>
                    <img src={logOutIcon} alt="Log Out" />
                </div>
                <span>Log Out</span>
            </li>
        </div>
     );
}
 
export default Account;