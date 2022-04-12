import React, { useState, useEffect } from "react";
import { getUserDatabase } from "./../functions/UserData";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { ReactComponent as Avatar } from "../assets/avatars/Boy1.svg";
import WhiteCurve from "../assets/images/Actions/Union.svg";
import "./Actions.scss";
import ConfettiAnimation from "./ConfettiAnimation";

export default function Actions() {
  const history = useHistory();
  const validChallenger = false;

  const [confettiAnimation, setConfettiAnimation] = useState();

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    getUserDatabase()
      .then((data) => {
        if (
          data.isRegisteredVoter &&
          data.notifyElectionReminders &&
          data.startedChallenge
        ) {
          setConfettiAnimation(<ConfettiAnimation time={8000} />);
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="Actions">
      {confettiAnimation}
      <div className="main-content">
        <div className="top">
          {validChallenger ? (
            <div>
              <div className="avatar-and-status" align="center">
                <div className="action-status">
                  <h1 className="heading">Take Action For:</h1>
                </div>
                <div className="avatar-container">
                  <Avatar id="challenger-avatar" />{" "}
                  {/**Avatar will change based on challenger*/}
                  <p id="challenger-name">Name</p>{" "}
                  {/**Get challenger name from url */}
                </div>
              </div>
              <img src={WhiteCurve} className="curve" />
            </div>
          ) : (
            <h1 id="action-no-challenger" align="center">
              Take Action
            </h1>
          )}
        </div>
        <div className="action-items">
          <div className="py-2">
            <Button
              className="primary-button"
              onClick={() => {
                history.push("/voterreg");
                localStorage.setItem("player", "voter");
              }}
            >
              Register to vote
            </Button>
          </div>
          <div className="py-2">
            <Button
              className="secondary-button"
              onClick={() => {
                history.push("/election-reminders");
                localStorage.setItem("player", "reminder");
              }}
            >
              Get election reminders
            </Button>
          </div>
          <div className="py-2">
            <Button
              className="secondary-button"
              onClick={() => {
                history.push("/challengerwelcome");
              }}
            >
              Take the challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
