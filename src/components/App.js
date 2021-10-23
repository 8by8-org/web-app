import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ChallengePage from './ChallengePage';
import Login from './LoginPage';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import PlayerWelcome from './PlayerWelcome';
import Actions from './Actions';
import VoterRegistration from './VoterRegistration';
import Header from './Header';
import HomePage from './HomePage'
import './App.css';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <div id='app-outer-wrapper'>
                    <div id='app-wrapper'>
                        <Router>
                            <Switch>
                            <Route exact path="/"><Redirect to="/homepage" /></Route>
                                <Route path='/homepage' component={HomePage} />
                                <Route path='/login' component={Login} />
                                <PrivateRoute path='/challenge' component={ChallengePage} />
                                <PrivateRoute path='/logout' component={Logout} />
                                <Route path='/playerwelcome' component={PlayerWelcome} />
                                <Route path='/actions' component={Actions} />
                                <PrivateRoute path='/voterreg' component={VoterRegistration} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </AuthProvider>
        </>
    );
}

export default App;
