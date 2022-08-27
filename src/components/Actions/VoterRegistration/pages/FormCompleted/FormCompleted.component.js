import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";
import ScrollToTop from "../../../../../functions/ScrollToTop";
import { Link } from "react-router-dom";
import PopupModal from "../../../../Utility/PopupModal/PopupModal"

export const FormCompleted = () => {
  const history = useHistory();
  const { currentUserData, voterRegistrationData } = useAuth();
  
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExpectModal, setShowExpectModal] = useState(false);
  const [showMailRegModal, setShowMailRegModal] = useState(false);
  const [allowOnlineReg, setAllowOnlineReg] = useState(true);
  const [userState, setUserState] = useState();
  const [onlineRegLink, setOnlineRegLink] = useState();
  const ToggleReminderModal = (e) => setShowReminderModal(!showReminderModal);
  const ToggleExpectModal = (e) => setShowExpectModal(!showExpectModal);
  const ToggleMailRegModal = (e) => setShowMailRegModal(!showMailRegModal);
  let redirect = "/progress";
  if (currentUserData && currentUserData.invitedBy.length > 0) {
    redirect = "/actions";
  }

  ScrollToTop();

  const getStateRegData = () => {
    fetch('../../../../../../state_vote_info.json'
    ,{
      headers : {
        'Content-Type' : 'application/json',
        'accept' : 'application.json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(stateJson) {
      const userState = voterRegistrationData.state;
      setUserState(stateJson.states[userState].name);
      setAllowOnlineReg(stateJson.states[userState].onlinereg);
      setOnlineRegLink(stateJson.states[userState].voteregsite);
    })
  }

  useEffect(() => {
    getStateRegData()
  }, [])

  return (
    <>
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">YOU COMPLETED</u><br />
        THE FORM!
      </h1>
      {allowOnlineReg ? (
      <div>
        <p className="register-form-text-completed">
          To complete the full process with your state, please go to the 
          {' '}{userState} website to complete your voter registration!
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
          <Link className="link--light" to={redirect}>Get email with PDF file</Link>
        </p>
        <Link className="link--light register-form-text" to={redirect}>
          Back to 8by8 Challenge
        </Link>
      </div>
      ):(
      <div>
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
      </div>
    )}
    </form>
    {showReminderModal && (
    <PopupModal
      setOpenModal={setShowReminderModal}
      theme = {"modalContainer--light"}
      content = {
        <>
          <div className="reminder-modal">
            <h3>COMPLETE REGISTRATION <br />ONLINE WITH YOUR STATE</h3>
            <p className="register-form-text-tight">Make sure to have your 
            <span className="bold"> State ID</span> or <span className="bold"> 
            driver's license</span> ready. If you do not have either of
            these, you can <span className="bold-undrln">register by mail.</span>
            </p>
            <a
              className="a-btn"
              target = "_blank"
              href = {onlineRegLink}
            >
              GO TO STATE WEBSITE
            </a>
            <button
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
        theme = {"modalContainer--light-expect"}
        scroll = {true}
        content = {
        <>
        <div className="reminder-modal">
          <h3>WHAT TO EXPECT AT YOUR STATE WEBSITE</h3>
          <div>
            <h3 className="MargTop">1. FINISH YOUR STATE'S VOTER REGISTRATION ONLINE</h3>
            <p>
              To complete the full process with your state, you will be asked a
              few additional questions online. Make sure to have your State ID 
              or driver's license ready. If you do not have either of these, 
              you can {' '} <a className="link--light">register by mail.</a>
            </p>
            <h3 className="MargTop">2. WAIT FOR THE STATE TO CONFIRM YOUR APPLICATION</h3>
            <p>
              Depending on your state, it could take 3-5 days to process your 
              application. You will receive a Voter Notification Card from your 
              county elections office.
            </p>
            <a className="link">Voter registration resources</a>
            <a
              className="a-btn"
              target = "_blank"
              href = {onlineRegLink}
            >
              GO TO STATE WEBSITE
            </a>
          </div>
        </div>
        </>
        }>
      </PopupModal>
    )}
    {showMailRegModal && (
      <PopupModal
        setOpenModal = {setShowMailRegModal}
        theme = {"modalContainer--light"}
        content = {
        <>
        <div className="reminder-modal">
          <h3>COMPLETE VOTER REGISTRATION BY MAIL</h3>
          <div>
            <h3>1. CHECK YOUR EMAIL</h3>
            <p>
              We emailed you a PDF of your completed form. You can print it out
              and mail it to your state to complete your voter registration.
            </p>
            <h3>2. MAIL IT IN</h3>
            <p>
              Send the completed form to your Secretary of State's office.
            </p>
            <button
            className="tight-btn"
              onClick={(e) => {
                e.preventDefault();
                ToggleMailRegModal(e);
              }}
            >
              OK, GOT IT
            </button>
          </div>
        </div>
        </>
        }>
      </PopupModal>
    )}
    <div className="reg-more-infoContainer">
        <p className="register-form-text-label">More information</p>
        <button 
          className="info-link"
          onClick={(e) => {
            e.preventDefault();
            ToggleMailRegModal(e);
          }}
        >
          How to register to vote by mail</button><br />
        {allowOnlineReg && (
          <>
          <a className="info-link">How to register online to vote</a><br />
          </>
        )}
        <a className="info-link" 
          href={"https://vote.gov/register/" + 
          voterRegistrationData.state.toLowerCase()}
          target = "_blank"
        >
          Voter registration resources
        </a>
    </div>
    </>
  );
};