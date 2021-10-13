import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signin from "./Authentication/SigninPage";
import Signout from "./Authentication/Signout";
import SignupPage from './Authentication/SignupPage';
import PrivateRoute from "./Helpers/PrivateRoute";
import Header from "./Header/Header";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import Progress from "./Progress";
import ChallengerWelcome from "./ChallengerWelcome/ChallengerWelcome";
import ElectionReminder from "./ElectionReminder";

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
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/electionreminder" component={ElectionReminder} />
                <PrivateRoute path="/Signout" component={Signout} />
                <PrivateRoute path="/progress" component={Progress} />
              </Switch>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;