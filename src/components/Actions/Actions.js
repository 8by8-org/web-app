import React, { useState, useEffect } from "react";
import { getUserDatabase } from "./../../functions/UserData";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Avatar1 from "./../../assets/avatars/avatar1.svg";
import Avatar2 from "./../../assets/avatars/avatar2.svg";
import Avatar3 from "./../../assets/avatars/avatar3.svg";
import Avatar4 from "./../../assets/avatars/avatar4.svg";
import WhiteCurve from "./../../assets/images/Actions/Union.svg";
import Crown from "./../../assets/images/Actions/Crown.svg";
import ConfettiAnimation from "./../ConfettiAnimation";
import "./Actions.scss";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];

export default function Actions() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [challengerInfo, setChallengerInfo] = useState(null);
  const [ registeredVoter, setRegisteredVoter ] = useState(false);
  const [ notifyElectionReminders, setNotifyElectionReminders ] = useState(false);
  const [ startedChallenge, setStartedChallenge ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("challengerInfo")) {
      setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")));
      fetchUserData();
    }
    setLoading(false);
  }, [loading]);

  function fetchUserData() {
    getUserDatabase()
      .then((data) => {
        setRegisteredVoter(data.isRegisteredVoter);
        setStartedChallenge(data.startedChallenge);
        setNotifyElectionReminders(data.notifyElectionReminders);
      })
      .catch((e) => console.log(e));
  }

  return (
    loading === false ?
      // if all three actions are completed
      registeredVoter && notifyElectionReminders && startedChallenge ?
        <div className="actions">
          <ConfettiAnimation time={8000} />

          <div className="top">
            <div className="avatar-and-status-finished">
              <div className="action-status-finished">
                <h1 className="heading">
                  You are done!<br/>
                  You Supported:
                </h1>
              </div>

              <div className="avatar-container">
                <div className="images">
                  <img
                    alt="Challenger Avatar"
                    src={challengerInfo.avatar ? avatars[(challengerInfo.avatar)-1] : avatars[0]}
                    id="challenger-avatar"
                  />
                </div>

                <p id="challenger-name">{challengerInfo.name}</p>
              </div>
            </div>
          </div>

          <img alt="White Curve" src={WhiteCurve} className="curve"/>

          <div className="action-items">
            <div className="py-2">
              <Button
                className="primary-button"
                onClick={() => {history.push(`/signin`)}}
              >
                See Your Challenge
              </Button>
            </div>

            <div className="py-2">
              <Button
                className="secondary-button"
                onClick={() => {}}
              >
                Share About Your Actions
              </Button>
            </div>
          </div>
        </div>
      :
        // when there are actions that can still be completed by the user
        <div className="actions">
          <div className="top">
            {challengerInfo ?
              // if the user is doing actions for someone else's challenge
              <div className="avatar-and-status">
                <div className="action-status">
                  {registeredVoter || notifyElectionReminders || startedChallenge ?
                    <h1 className="heading">You Took Action!</h1>
                  :
                    <h1 className="heading">Take Action For:</h1>
                  }
                </div>

                <div className="avatar-container">
                  <div className="images">
                    <img
                      alt="Challenger Avatar"
                      src={challengerInfo.avatar ? avatars[(challengerInfo.avatar)-1] : avatars[0]}
                      id="challenger-avatar"
                    />
                    {(registeredVoter || notifyElectionReminders || startedChallenge) &&
                      <div id="challenger-crown">
                        <img alt="Challenger Crown" src={Crown} className="crown"/>
                      </div>
                    }
                  </div>

                  <p id="challenger-name">{challengerInfo.name}</p>
                </div>
              </div>
            :
              // if the user is not doing actions for someone else's challenge
              <h1 id="action-no-challenger" align="center">Take Action</h1>
            }
          </div>

          <img alt="White Curve" src={WhiteCurve} className="curve"/>

          <div className="action-items">
            {/* when only Take the challenge action is left */}
            {registeredVoter && notifyElectionReminders && !startedChallenge ?
              <h6 className="subheading">
                OTHER ACTIONS YOU CAN TAKE TO<br/>
                HELP THE AAPI COMMUNITY
              </h6>
            :
              // when there is at least one action completed
              (registeredVoter || notifyElectionReminders || startedChallenge) &&
                <h6 className="subheading">
                  {challengerInfo.name} GOT A BADGE!<br/>
                  HERE ARE OTHER ACTIONS TO HELP<br/>
                  THE AAPI COMMUNITY<br/>
                </h6>
            }

            {/* action buttons only displayed when they are not completed */}
            {!registeredVoter &&
              <div className="py-2">
                <Button
                  className="primary-button"
                  onClick={() => {history.push(`/voterreg`); localStorage.setItem('player', 'voterreg')}}
                >
                  Register to vote
                </Button>
              </div>
            }

            {!notifyElectionReminders &&
            <div className="py-2">
              <Button
                className={registeredVoter ? "primary-button" : "secondary-button"}
                onClick={() => {history.push(`/election-reminders`); localStorage.setItem('player', 'election-reminders')}}
              >
                Get election reminders
              </Button>
            </div>
            }

            {!startedChallenge &&
            <div className="py-2">
              <Button
                className={registeredVoter && notifyElectionReminders ? "primary-button" : "secondary-button"}
                onClick={() => {history.push('/challengerwelcome'); localStorage.setItem('player', 'progress')}}
              >
                Take the challenge
              </Button>
            </div>
            }

            {registeredVoter && notifyElectionReminders && !startedChallenge ?
              // when only Take the challenge action is left
              <div>
                <h6 className="text">
                  Voting matters towards better AAPI<br/>
                  representation in our country. You can help<br/>
                  the community by encouring others to<br/>
                  register! Take the challenge on your own!<br/>
                </h6>
                <div className="links-container">
                  <a href="/homepage" className="links">What is 8by8 Challenge?</a>
                  <a href="url" className="links">Share about your actions</a>
                </div>
              </div>
            :
              // when at least one action is completed
              <div>
                {/* these are for when only that specific action is completed */}
                {registeredVoter && !notifyElectionReminders && !startedChallenge && <h6 className="text">Thanks for registering to vote!</h6>}

                {!registeredVoter && notifyElectionReminders && !startedChallenge && <h6 className="text">Thanks for getting election reminders!</h6>}

                {!registeredVoter && !notifyElectionReminders && startedChallenge && <h6 className="text">Thanks for taking the challenge!</h6>}

                {/* this is for when registered to vote or election reminders are turned on and challenge has been started */}
                {((registeredVoter || notifyElectionReminders) && startedChallenge) &&
                  <h6 className="text">Thanks for your actions!</h6>}

                <div className="links-container">
                  {/* this is for when registered to vote or election reminders are turned on */}
                  {((registeredVoter && !notifyElectionReminders && !startedChallenge) ||
                    (!registeredVoter && notifyElectionReminders && !startedChallenge)) &&
                    <a href="url" className="links">Share about your action</a>}

                  {/* this is for when registered to vote or election reminders are turned on and challenge has been started */}
                  {((registeredVoter || notifyElectionReminders) && startedChallenge) &&
                    <a href="url" className="links">Share about your actions</a>}

                  {/* this is for when user has started their own challenge */}
                  {startedChallenge && <a href="/signin" className="links">See your challenge</a>}
                </div>
              </div>
            }
          </div>
        </div>
    : <h1>loading</h1>
  )
}
