import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Login from "./LoginPage";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import "./App.css";
import HomePage from "./HomePage";
import Progress from "./Progress";
import ChallengerWelcome from "./ChallengerWelcome";
import ElectionReminder from "./ElectionReminder";
import PlayerWelcome from "./PlayerWelcome";

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
                <Route path="/playerwelcome" component={PlayerWelcome} />
                <Route path="/login" component={Login} />
                <Route path="/electionreminder" component={ElectionReminder} />
                <PrivateRoute path="/logout" component={Logout} />
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
