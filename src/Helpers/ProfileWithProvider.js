import Profile from "../components/Dashboard/Profile/Profile";
import { ProfileProvider } from "../Contexts/ProfileContext";

const ProfileWithProvider = () => {
    return ( 
        <ProfileProvider>
            <Profile />
        </ProfileProvider>
     );
}
 
export default ProfileWithProvider;