import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Profile from './Profile/Profile';
import Main from './Main page/Main';
import Messenger from './Messenger/Messenger';
import Error404 from '../Error404.js/Error404';
import Loading from '../Common/Loading/Loading';
import { DashboardContext } from '../../Contexts/DashboardContext';

import './Dashboard.css';

const Dashboard = () => {
    const token = localStorage.getItem('token');
    const { currentUser, loading, openChats } = useContext(DashboardContext);

    const history = useHistory();

    if(!token){
        history.push('/login');
        return null;
    } 
    else {
        return ( 
            <>
                {Object.keys(currentUser).length !== 0 &&
                    <div className="dashBoard">
                        {!loading?
                            <>
                                <Navbar />
                                <Switch>
                                    <Route path="/user-:id" component={Profile} />
                                    <Route exact path="/" component={Main} />
                                    <Route component={Error404} />
                                </Switch>
                                {
                                    openChats.length > 0 && 
                                    <div className="messenger-container">
                                        {
                                            openChats.map(user => {
                                                return <Messenger user={user} currentUser={currentUser} key={user._id} />
                                            })
                                        }
                                    </div>
                                }
                            </> 
                            :   <Loading />
                        }
                    </div>
                }
            </>
        );
    }
}
 
export default Dashboard;