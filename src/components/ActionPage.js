import React from "react";
import { useHistory } from "react-router-dom";
import "react-bootstrap";
import "./ActionPage.scss";
import Avatar from "../assets/images/avatars/Girl2 3.png";
// import Background from "../assets/images/MaskGroup.png";

export default function ActionPage() {
    const actionDivStyle = {
        padding: "0px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      };

    const history = useHistory();
    return (
      <div class="white-background">
          <div style={actionDivStyle}>
              <h1 class="bebas-neue take-action black-text padded">TAKE ACTION</h1>
              <p class="lato black-text padded">Thanks for registering to vote! Henry will get one badge 
              because of your action. Well done!</p>
              <img class="avatar-image mt-2" src={Avatar} alt="Avatar"></img>
              <p class="lato black-text tiny-text padded">You're taking action for:</p>
              <h1 class="montserrat challenge-name black-text padded">(Player)'s Challenge</h1>
              <div class="d-flex justify-content-center">
                <button class="avatar-button"><p class="montserrat avatar-button-text">Send Emoji</p></button>
                <button class="avatar-button"><p class="montserrat avatar-button-text">Share</p></button>
              </div>
              <p class="lato black-text mt-5 padded">You can still help the AAPI community by
              taking another action!</p>
              <div class="">
                <button class="gray-button"><p class="montserrat black gray-button-text">Get election reminders</p></button>
                <button class="gray-button" onClick={() => history.push("/challengewelcome")}><p class="montserrat black gray-button-text">Take the challenge yourself</p></button>
              </div>
              <p CLASS="lato black-text tiny-text padded mt-5">Looking for something else?</p>
              <p class="lato black-text tiny-text link-text"><a class="lato" href="http://www.google.com">Restart voter registration</a></p>
        </div>
      </div>
    );
  }
