import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ChallengePage from './ChallengePage';
import LandingPage from './LandingPage';
import Login from './LoginPage';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route path='/login' component={Login} />
                        <PrivateRoute path='/challenge' component={ChallengePage} />
                        <PrivateRoute path='/logout' component={Logout} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
