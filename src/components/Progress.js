import React, { useState } from "react";
import { Button } from "react-bootstrap";
import avatar from "../assets/images/avatars/8BY8-face-icons-3.png";
import Header from "./Header";
import "./Progress.css";

export default function Progress() {
  // Holds 8 by default; will change to days left according to server call
  const [dayCounter, changeDayCounter] = useState(8);

  // I chose to represent the badge array with booleans for now
  // String evaluation will probably have to be used to represent player states
  const progressArr = new Array(8).fill(true);

  // Testing code to make sure element placement is correct
  progressArr[0] = true;
  progressArr[4] = true;

  // Passed as callback function to create badge elements based on server call
  // startNumber is used to number the badges
  const generateBadges = (startNumber) => (element, index) => {
    return (
      <div className="badge-box">
        {element ? (
          <div className="success">
            <div className="avatar yellow-background">
              <img src={avatar} />
            </div>
            <p className="name-text lato black spacing">placeholder</p>
            <Button
              className="send-emoji yellow-background lato black"
              style={{
                fontSize: "9px",
                whiteSpace: "nowrap",
                textAlign: "center",
                padding: "0px",
              }}
            >
              Send Emoji
            </Button>
          </div>
        ) : (
          <div className="failure">
            <div className="up-down-arm"></div>
            <div className="down-up-arm"></div>
            <p className="bebase-neue black badge-counter">
              {index + startNumber}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Processes emoji send to selected user
  const sendEmoji = () => {
    console.log("sent");
  };
  return (
    <div id="progress-container">
      <p className="bebas-neue black spacing" id="challenge-badge-header">
        YOUR CHALLENGE BADGES
      </p>
      <div id="day-counter-container">
        <div className="day-box yellow-background" id="yellow-day-box"></div>
        <div className="day-box black-background">
          <p className="bebas-neue white" id="day-number">
            {dayCounter}
          </p>
          <p className="lato white spacing" id="days-left">
            days left
          </p>
        </div>
      </div>
      <p className="black" id="thanks-message">
        Thanks for taking the challenge! Invite friends to join your challenge
        to earn badges.
      </p>
      <div className="badge-row" id="first-row">
        {progressArr.slice(0, 4).map(generateBadges(1))}
      </div>
      <div className="badge-row" id="second-row">
        {progressArr.slice(4).map(generateBadges(5))}
      </div>
      <button className="black spacing" id="invite">
        Invite friends
      </button>
      <p className="black spacing" id="register-message">
        Not registered to vote yet? <a href="../voterreg">Register now</a> and
        earn your first badge!
      </p>
    </div>
  );
}
