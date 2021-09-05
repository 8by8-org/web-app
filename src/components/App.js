import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ChallengePage from './ChallengePage';
import LandingPage from './LandingPage';
import Login from './LoginPage';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import SiteNavbar from './SiteNavbar';
import PlayerWelcome from './PlayerWelcome';
import './App.css';
import Actions from './Actions';
import VoterRegistration from './VoterRegistration';


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
                                <Route path='/login' component={Login} />
                                <PrivateRoute path='/challenge' component={ChallengePage} />
                                <PrivateRoute path='/logout' component={Logout} />
                                <Route path='/playerwelcome' component={PlayerWelcome} />
                                <Route path='/actions' component={Actions} />
                                <Route path='/voterreg' component={VoterRegistration} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </AuthProvider>
        </>
    );
}

export default App;
