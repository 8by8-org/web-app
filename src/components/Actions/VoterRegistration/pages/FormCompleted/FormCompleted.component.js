import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../../functions/ScrollToTop";
import { Link } from "react-router-dom";
import PopupModal from "../../../../Utility/PopupModal/PopupModal"

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData } = useAuth();
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExpectModal, setShowExpectModal] = useState(false);
  const ToggleReminderModal = (e) => setShowReminderModal(!showReminderModal);
  const ToggleExpectModal = (e) => setShowExpectModal(!showExpectModal);
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
        THE FORM!
      </h1>
      <p className="register-form-text">
        To complete the full process with your state, please go to the **Insert**
        website to complete your voter registration!
      </p>
      <button 
        className="tight-btn"
        onClick={(e) => {
          e.preventDefault();
          ToggleReminderModal(e);
        }}
      >
        CONTINUE TO STATE WEBSITE
      </button>
      <p className="register-form-text-label">
        Or register by mail!
      </p>
      <p className="register-form-text-tight">
        We can email you a PDF file of your completed form. Print it out and 
        mail it to your state to complete your voter registration.{' '} 
        <Link className="link" to={redirect}>Get email with PDF file</Link>
      </p>
      <Link className="link register-form-text" to={redirect}>
        Back to 8by8 Challenge
      </Link>
      {/*<p className="register-form-text">
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
      </button>*/}
    </form>
    {showReminderModal && (
    <PopupModal
      setOpenModal={setShowReminderModal}
      theme = {"modalContainer--light"}
      content = {
        <>
          <div>
            <h3>COMPLETE REGISTRATION ONLINE WITH YOUR STATE</h3>
            <p>Make sure to have your <span>State ID</span> or 
              <span> driver's license</span> ready. If you do not have either of
              of these, you can <span>register by mail.</span>
            </p>
            <button
              className="next-btn"
              onClick={(e) => {
                e.preventDefault();
                ToggleReminderModal(e);
              }}
            >
              GO TO STATE WEBSITE
            </button>
            <button 
              className="link"
              onClick={(e) => {
                e.preventDefault();
                ToggleExpectModal(e);
                ToggleReminderModal(e);
              }}
            >
              How does this work?
            </button>
          </div>
        </>
      }
    >
    </PopupModal>
    )}
    {showExpectModal && (
      <PopupModal
        setOpenModal = {setShowExpectModal}
        content = {
        <>
        <div>
          <h3>WHAT TO EXPECT AT YOUR STATE WEBSITE</h3>
          <div>
            <h3>1. FINISH YOUR STATE'S REGISTRATION ONLINE</h3>
            <p>
              To complete the full process with your state, you will be asked a
              few additional questions online. Make sure to have your State ID 
              or driver's license ready. If you do not have either of these, 
              you can {' '} <a className="link">register by mail.</a>
            </p>
            <h3>WAIT FOR THE STATE TO CONFIRM YOUR APPLICATION</h3>
            <p>
              Depending on your state, it could take 3-5 days to process your 
              application. You will receive a Voter Notification Card from your 
              county elections office.
            </p>
            <a className="link">Voter registration resources</a>
            <button className="next-btn">
              GO TO STATE WEBSITE
            </button>
          </div>
        </div>
        </>
        }>
      </PopupModal>
    )}
    <div className="reg-more-infoContainer">
        <p className="register-form-text-label">More information</p>
        <a className="info-link">How to register to vote by mail</a><br />
        <a className="info-link">How to register to vote online</a><br />
        <a className="info-link">Voter registration resources</a>
    </div>
    </>
  );
};