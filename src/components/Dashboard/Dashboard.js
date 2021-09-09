import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import ProfileWithProvider from '../../Helpers/ProfileWithProvider';
import Main from './Main page/Main';
import Error404 from '../Error404.js/Error404';

import './Dashboard.css';

const Dashboard = () => {
    let history = useHistory();

    const token = localStorage.getItem('token');
    if(!token){
        history.push('/login');
        return null;
    } 
    else {
        return ( 
            <div className="dashBoard">
                <Navbar />
                <Switch>
                    <Route path="/user-:id" component={ProfileWithProvider} />
                    <Route exact path="/" component={Main} />
                    <Route component={Error404} />
                </Switch>
            </div>
        );
    }
}
 
export default Dashboard;