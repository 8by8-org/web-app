import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import { useAuth } from "../../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";
import ZipCodeData from "zipcode-data";
import { getEligibility } from "../../utils";
import { ProgressBar } from "../ProgressBar/ProgressBar.component";
import { addInvitedBy } from "../../../../../functions/AddInvite";
import ScrollToTop from "../../../../../functions/ScrollToTop";

const ERROR_MESSAGES = [
  "",
  "Please complete all of the required fields.",
  "You must be a US Citizen to vote.",
  "Please enter a valid US zipcode.",
];

export const Eligibility = () => {
  const history = useHistory();
  const {
    currentUser,
    currentUserData,
    voterRegistrationData,
    setVoterRegistrationData,
  } = useAuth();
  //redirect user to form completed page if they have already completed the flow
  useEffect(() => {
    if (currentUserData && currentUserData.isRegisteredVoter)
      history.push("/voterreg/completed");
    //add invited by
    if (localStorage.getItem("player") && currentUser) addInvitedBy();
  }, []);

  ScrollToTop();

  //determines whether floating label should float up
  const [activeFields, setActiveFields] = useState({
    zip: voterRegistrationData.zip.length > 0,
    dob: voterRegistrationData.dob.length > 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  return (
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">REGISTER TO VOTE</u>
      </h1>
      <ProgressBar progressPercent={25} />
      <p>Registering to vote is easy, and only takes a few minutes!</p>
      <h2 className="register-form-title-small">ELIGIBILITY</h2>
      <label className="register-label">Email</label>
      <p className="register-input">{voterRegistrationData.email}</p>
      <br />
      <label
        htmlFor="zip"
        className={
          activeFields.zip ? "floating-label-active" : "floating-label-default"
        }
      >
        Zip Code*
      </label>
      <input
        className="register-input"
        type="text"
        id="zip"
        name="zip"
        value={voterRegistrationData.zip}
        onClick={() => {
          setActiveFields({ ...activeFields, zip: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, zip: true });
        }}
        onKeyDown={(e) => {
          //prevent user from entering a non-digit
          if (
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            e.key !== "." &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight" &&
            e.key !== "ArrowUp" &&
            e.key !== "ArrowDown" &&
            !e.key.match(/\d/)
          ) {
            e.preventDefault();
          }
        }}
        onChange={(event) => {
          const zipInput = document.getElementById("zip");
          zipInput.classList.remove("requiredField");
          let state = "";
          let zip;
          if (event.target.value) {
            zip = Number(event.target.value).toString();
          } else {
            zip = "";
          }
          if (zip.length <= 5) {
            if (ZipCodeData.lookupZip(zip)) {
              state = ZipCodeData.stateFromZip(zip);
            }
            //set error code field to appear below zip code field
            if (voterRegistrationData.zip.length === 0)
            {
              const zipInput = document.getElementById("zip");
              zipInput.classList.add("requiredField");
            }
            
            setVoterRegistrationData({
              ...voterRegistrationData,
              zip: zip,
              state: state,
            });

            setErrorCode(1);
          }
        }}
        required
      />
      <br/>
      <label
        className={
          activeFields.dob ? "floating-label-active" : "floating-label-default"
        }
        onClick={() => {
          setActiveFields({ ...activeFields, dob: true });
        }}
      >
        Date of Birth*
      </label>

      <input
        className="register-input"
        type="date"
        id="dob"
        name="dob"
        value={voterRegistrationData.dob}
        style={{
          color: activeFields.dob ? "black" : "white",
          transition: "color 250ms 150ms ease-out",
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, dob: true });
        }}
        onChange={(event) => {
          const dobInput = document.getElementById("dob");
          dobInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            dob: event.target.value,
          });
          //set error code field to appear below dob field
          if (voterRegistrationData.dob.length === 0) {
            const dobInput = document.getElementById("dob");
            dobInput.classList.add("requiredField");
          }
          setErrorCode(1);
            return;
        }}
        required
      />
      <br/>

      <div>
        <label htmlFor="citizen" className="register-label">
          <input
            className="register-checkbox"
            type="checkbox"
            id="citizen"
            name="citizen"
            onChange={(event) => {
              setVoterRegistrationData({
                ...voterRegistrationData,
                citizen: event.target.checked,
              });
            }}
            required
          />
          I am a US Citizen*
        </label>
      </div>
      <div>
        <label htmlFor="eighteenPlus" className="register-label">
          <input
            className="register-checkbox"
            type="checkbox"
            id="eighteenPlus"
            name="eighteenPlus"
            onChange={(event) => {
              setVoterRegistrationData({
                ...voterRegistrationData,
                eighteenPlus: event.target.checked,
              });
            }}
            required
          />
          I will be 18 or older by the time of the next election.*
        </label>
      </div>
      <br />
      <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
        {ERROR_MESSAGES[errorCode]}
      </p>
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          if (!voterRegistrationData.citizen) {
            setErrorCode(2);
            return;
          }
          if (!ZipCodeData.lookupZip(voterRegistrationData.zip)) {
            setErrorCode(3);
            return;
          }
          //other wise get the user's elibility
          const status = getEligibility(
            voterRegistrationData.dob,
            voterRegistrationData.state
          );
          if (status.eligibility === "eligible")
            history.push("/voterreg/yourname");
          else if (
            status.eligibility === "preregister" ||
            status.eligibility === "underage"
          ) {
            setShowModal(true);
          }
        }}
      >
        NEXT
      </button>
      {showModal && (
        <div className="voter-reg-modal-outer-container">
          <div className="voter-reg-modal-container">
            <IconContext.Provider value={{ color: "black" }}>
              <div className="voter-reg-modal">
                <div className="voter-reg-toggle-container">
                  <button
                    className="voter-reg-modal-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(false);
                    }}
                  >
                    <MdIcons.MdClose size={"1x"} />
                  </button>
                </div>
                <h3 className="voter-reg-modal-heading">Hey there!</h3>
                <p className="voter-reg-modal-heading">
                  Looks like you're not 18 yet.
                </p>
                <p className="voter-reg-modal-text">
                  {
                    getEligibility(
                      voterRegistrationData.dob,
                      voterRegistrationData.state
                    ).message
                  }
                </p>
                <button
                  className="voter-reg-modal-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/voterreg/yourname");
                  }}
                >
                  <span>KEEP GOING</span>
                </button>
                <button
                  className="voter-reg-modal-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                  }}
                >
                  <span>OK, NEVER MIND</span>
                </button>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      )}
    </form>
  );
};
