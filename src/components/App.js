import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "./App.css";
import Login from "./LoginPage";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import HomePage from "./HomePage";
import Progress from "./Progress";
import ChallengerWelcome from "./ChallengerWelcome";
import ElectionReminder from "./ElectionReminder";
import Footer from "./Footer";
import PlayerWelcome from "./PlayerWelcome";
import Actions from "./Actions";
import VoterRegistration from "./VoterRegistration";

function App() {
  
  
  return (
    <>
      <AuthProvider>
        <div id="header">
          <Header />
        </div>
        <div id="app-outer-wrapper">
          <div id="app-wrapper">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/homepage" />
                </Route>
                <Route path="/homepage" component={HomePage} />
                <Route
                  path="/challengerwelcome"
                  component={ChallengerWelcome}
                />
                <Route path="/login" component={Login} />
                <Route path="/electionreminder" component={ElectionReminder} />
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute path="/progress" component={Progress} />
                <Route path="/playerwelcome" component={PlayerWelcome} />
                <Route exact path="/actions/:id" component={Actions} />
                <PrivateRoute path="/voterreg" component={VoterRegistration} />
              </Switch>
            </Router>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
