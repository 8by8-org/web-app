import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../../functions/ScrollToTop";

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData } = useAuth();
  let redirect = "/progress";
  if (currentUserData && currentUserData.invitedBy.length > 0) {
    redirect = "/actions";
  }

  ScrollToTop();

  return (
    <>
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">YOU COMPLETED</u><br />
        THE FORM
      </h1>
      <p className="register-form-text">
        To complete the full process with your state, please go to the **Insert**
        website to complete your voter registration!
      </p>
      <button 
        className="tight-btn"
      >
        CONTINUE TO STATE WEBSITE
      </button>
      <p className="register-form-text-label">
        Or register by mail!
      </p>
      <p className="register-form-text-tight">
        We can email you a PDF file of your completed form. Print it out and 
        mail it to your state to complete your voter registration. 
        <a className="link">Get email with PDF file</a>
      </p>
      <p className="register-form-text">
        We've emailed you a PDF of your completed form. You can print it out and
        mail it to your state to complete your voter registration.
      </p>
      <button
        className="next-btn"
        onClick={(e) => {
          e.preventDefault();
          history.push(redirect);
        }}
      >
        GO BACK TO THE CHALLENGE
      </button>
    </form>
    <div className="reg-more-infoContainer">
        <p className="register-form-text-label">More information</p>
        <a className="info-link">How to register to vote by mail</a><br />
        <a className="info-link">How to register to vote online</a><br />
        <a className="info-link">Voter registration resources</a>
    </div>
    </>
  );
};