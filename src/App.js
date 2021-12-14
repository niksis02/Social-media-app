import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './components/Login/Login';
import DashboardWithProvider from './Helpers/DashboardWithProvider';
import RegisterWithProvider from './Helpers/RegisterWithProvider';
import Error404 from './components/Error404.js/Error404';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/notfound" component={Error404} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterWithProvider} />
        <Route path="/" component={DashboardWithProvider} />
      </Switch>
    </Router>
  )
}

export default App;
