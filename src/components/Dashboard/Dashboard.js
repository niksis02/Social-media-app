import { useEffect, useState, createContext } from 'react';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Main from './Main page/Main';
import Error404 from '../Error404.js/Error404';
import Loading from '../Common/Loading/Loading';

import ProfPicMale from '../../Assets/Pictures/profile_male.png';
import ProfPicFemale from '../../Assets/Pictures/profile_female.png';

import './Dashboard.css';

export const DashboardContext = createContext({});

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    let history = useHistory();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/users/user', {
                    headers: {
                        'authorization': token
                    }
                });
                const result = await response.json();
                setLoading(false);
                if(result.status === 'ok') {
                    if(!result.msg.profilePic) {
                        result.msg.profilePic = result.msg.gender? ProfPicMale: ProfPicFemale;
                    }
                    setUser(result.msg);
                }
                else if(result.status === 'error') {
                    setError(result.msg);
                }
            }
            catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    console.log(error);

    if(!token){
        history.push('/login');
        return null;
    } 
    else {
        return ( 
            <>
                {user && user.name &&
                    <div className="dashBoard">
                    <DashboardContext.Provider value={{user}}>
                        {!loading?
                            <>
                                <Navbar />
                                <Switch>
                                    <Route path="/user-:id" component={Profile} />
                                    <Route exact path="/" component={Main} />
                                    <Route component={Error404} />
                                </Switch>
                            </> : <Loading />
                        }
                    </DashboardContext.Provider>
                </div>
                }
            </>
        );
    }
}
 
export default Dashboard;