import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ChallengePage from './ChallengePage';
import LandingPage from './LandingPage';
import Signup from './SignupPage';
import Login from './LoginPage';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import SiteNavbar from './SiteNavbar';
import './App.css';

function App() {
    return (
        <>
            <AuthProvider>
                <SiteNavbar />
                <div id='app-outer-wrapper'>
                    <div id='app-wrapper'>
                        <Router>
                            <Switch>
                                <Route exact path='/' component={LandingPage} />
                                <Route path='/signin' component={Login} />
                                <Route path='/signup' component={Signup} />
                                <PrivateRoute path='/challenge' component={ChallengePage} />
                                <PrivateRoute path='/logout' component={Logout} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </AuthProvider>
        </>
    );
}

export default App;
