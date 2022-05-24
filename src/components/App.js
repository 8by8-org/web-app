import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ScrollToTop from "../functions/ScrollToTop";
import { AuthProvider } from "../contexts/AuthContext";
import Signin from "./Authentication/Signin";
import Signout from "./Authentication/Signout";
import SignupPage from "./Authentication/SignupPage";
import PrivateRoute from "./Helpers/PrivateRoute";
import Header from "./Header/Header";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import Progress from "./Progress/Progress";
import ChallengerWelcome from "./ChallengerWelcome/ChallengerWelcome";
import ElectionReminder from "./ElectionReminders/ElectionReminder";
import Footer from "./Footer";
import PlayerWelcome from "./PlayerWelcome";
import Actions from "./Actions/Actions";
//Voter Registration Pages
import { Eligibility } from "./VoterRegistration/pages/Eligibility/Eligibility.component";
import { YourName } from "./VoterRegistration/pages/YourName/YourName.component";
import { HomeAddress } from "./VoterRegistration/pages/HomeAddress/HomeAddress.component";
import { OtherInfo } from "./VoterRegistration/pages/OtherInfo/OtherInfo.component";
import { FormCompleted } from "./VoterRegistration/pages/FormCompleted/FormCompleted.component";
import TOS from "./TOS/TOS";

export default function App() {
  return (
    <>
      <AuthProvider>
        <div id="header">
          <Header />
        </div>
        <div id="app-outer-wrapper">
          <div id="app-wrapper">
            <Router>
              <ScrollToTop />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/homepage" />
                </Route>
                <Route path="/homepage" component={HomePage} />
                <Route
                  path="/challengerwelcome"
                  component={ChallengerWelcome}
                />
                <Route path="/signup" component={SignupPage} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute
                  path="/election-reminders"
                  component={ElectionReminder}
                />
                <PrivateRoute path="/progress" component={Progress} />
                <PrivateRoute path="/signout" component={Signout} />
                <Route path="/playerwelcome" component={PlayerWelcome} />
                <Route path="/share" component={PlayerWelcome} />
                <Route path="/actions" component={Actions} />
                <PrivateRoute
                  path="/voterreg/eligibility"
                  component={Eligibility}
                />
                <PrivateRoute path="/voterreg/yourname" component={YourName} />
                <PrivateRoute
                  path="/voterreg/homeaddress"
                  component={HomeAddress}
                />
                <PrivateRoute
                  path="/voterreg/otherinfo"
                  component={OtherInfo}
                />
                <PrivateRoute
                  path="/voterreg/completed"
                  component={FormCompleted}
                />
                <PrivateRoute path="/voterreg" component={Eligibility} />
                <Route path="/termsofservice" component={TOS} />
              </Switch>
            </Router>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
