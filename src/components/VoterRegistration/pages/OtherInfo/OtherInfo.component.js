import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { ProgressBar } from "../ProgressBar/ProgressBar.component";
import axios from "axios";
import "../../VoterRegistration.scss";
import { Tooltip } from "../Tooltip/Tooltip.component";
import { completedAction } from "../../../../functions/UserData";
import { LoadingWheel } from "../../../LoadingWheel/LoadingWheel.component";
import ScrollToTop from "../../../../functions/ScrollToTop";
import MetaTags from 'react-meta-tags';

const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const OtherInfo = () => {
  const history = useHistory();
  const {
    currentUserData,
    setCurrentUserData,
    voterRegistrationData,
    setVoterRegistrationData,
  } = useAuth();
  const [showOtherPartyField, setShowOtherPartyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [politicalParty, setPoliticalParty] = useState("");
  const [otherPartyField, setOtherPartyField] = useState("");
  const [activeFields, setActiveFields] = useState({
    otherParty:
      voterRegistrationData.party.length > 0 &&
      voterRegistrationData.party !== "democratic" &&
      voterRegistrationData.party !== "green" &&
      voterRegistrationData.party !== "libertarian" &&
      voterRegistrationData.party !== "republican" &&
      voterRegistrationData.party !== "none",
    idNumber: voterRegistrationData.idNumber.length > 0,
  });

  /*redirect the user to the form completed page if they've already register to vote
  using the 8x8 app, or to the appropriate previous page if that information is incomplete
  */
  useEffect(() => {
    if (currentUserData && currentUserData.isRegisteredVoter)
      history.push("/voterreg/completed");
    if (
      voterRegistrationData.zip.length === 0 ||
      voterRegistrationData.dob.length === 0
    ) {
      history.push("/voterreg/eligibility");
    } else if (
      voterRegistrationData.name_title.length === 0 ||
      voterRegistrationData.name_first.length === 0 ||
      voterRegistrationData.name_last.length === 0
    ) {
      history.push("/voterreg/yourname");
    } else if (
      voterRegistrationData.street.length === 0 ||
      voterRegistrationData.city.length === 0 ||
      voterRegistrationData.state.length === 0
    ) {
      history.push("/voterreg/homeaddress");
    }
  }, []);

  ScrollToTop();

  return (
    <form className="voterRegForm">
      <MetaTags>
        <meta
          name="description"
          content="8by8 Challenge App, made by 8by8.us with ❤️ "
        />
        <title>8by8</title>
      </MetaTags>
      <h1 className="register-form-title">
        <u className="underline">REGISTE</u>R TO VOTE
      </h1>
      <ProgressBar progressPercent={100} />
      {isLoading && <LoadingWheel overlay={true} />}
      <h2 className="register-form-title-small">OTHER DETAILS</h2>
      <label htmlFor="party" className="floating-label-active">
        Political Party*
      </label>
      <select
        className="register-input"
        required
        name="party"
        id="party"
        value={politicalParty}
        onChange={({ target }) => {
          const { value } = target;
          setPoliticalParty(value);
          if (value === "other") {
            setShowOtherPartyField(true);
            setVoterRegistrationData({ ...voterRegistrationData, party: "" });
          } else {
            setOtherPartyField("");
            setShowOtherPartyField(false);
            setVoterRegistrationData({
              ...voterRegistrationData,
              party: value,
            });
          }
        }}
      >
        <option value="">{""}</option>
        <option value="democratic">Democratic</option>
        <option value="green">Green</option>
        <option value="libertarian">Libertarian</option>
        <option value="republican">Republican</option>
        <option value="none">None (no political affiliation)</option>
        <option value="other">Other</option>
      </select>
      <br />
      {showOtherPartyField && (
        <>
          <label
            className={
              activeFields.otherParty
                ? "floating-label-active"
                : "floating-label-default"
            }
            onClick={() => {
              setActiveFields({ ...activeFields, otherParty: true });
            }}
          >
            Other Political Party*
          </label>
          <input
            required
            className="register-input"
            type="text"
            id="otherParty"
            value={otherPartyField}
            onClick={() => {
              setActiveFields({ ...activeFields, otherParty: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, otherParty: true });
            }}
            onChange={({ target }) => {
              const otherPartyInput = document.getElementById("otherParty");
              otherPartyInput.classList.remove("requiredField");
              setOtherPartyField(target.value);
              setVoterRegistrationData({
                ...voterRegistrationData,
                party: target.value,
              });
            }}
          />
          <br />
        </>
      )}
      <div className="horizontalContainer">
        <div className="verticalContainer">
          <label htmlFor="race" className="floating-label-active">
            Race*
          </label>
          <select
            className="register-input"
            id="race"
            value={voterRegistrationData.race}
            onChange={({ target }) => {
              if (target.value.length > 0) {
                const raceInput = document.getElementById("race");
                raceInput.classList.remove("requiredField");
              }
              setVoterRegistrationData({
                ...voterRegistrationData,
                race: target.value,
              });
            }}
          >
            <option value="" selected>
              {""}
            </option>
            <option value="asian">Asian</option>
            <option value="black/african american">
              Black or African American
            </option>
            <option value="hispanic/latino">Hispanic or Latino</option>
            <option value="native american/alaskan native">
              Native American or Alaskan Native
            </option>
            <option value="native hawaiian/pacific islander">
              Native Hawaiian or Other Pacific Islander
            </option>
            <option value="other">Other</option>
            <option value="two+ races">Two or More Races</option>
            <option value="white">White</option>
            <option value="decline to state">Decline to State</option>
          </select>
        </div>
        <Tooltip text="We appreciate this information in order to measure the effectiveness of our voter registration efforts." />
      </div>
      <br />
      <label
        htmlFor="idNumber"
        className={
          activeFields.idNumber
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        ID Number*
      </label>
      <input
        className="register-input"
        type="text"
        name="idNumber"
        id="idNumber"
        value={voterRegistrationData.idNumber}
        onClick={() => {
          setActiveFields({ ...activeFields, idNumber: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, idNumber: true });
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
        onChange={({ target }) => {
          const idInput = document.getElementById("idNumber");
          idInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            idNumber: target.value,
          });
        }}
      />
      <br />
      <small>
        Provide your driver’s license, state identification card number, or the
        last 4 digits of your social security number. If you don’t include this
        info now, you’ll need to provide identification when you vote.
      </small>
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "gray",
          marginTop: "8px",
        }}
      >
        {isLoading && "creating form..."}
      </p>
      <p className="error-message">{error}</p>
      <button
        className="next-btn"
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.5 : 1, marginTop: 0 }}
        onClick={async (event) => {
          event.preventDefault();
          //first make sure the required fields are completed
          let checksPassed = true;
          if (!voterRegistrationData.party.length > 0) {
            if (!showOtherPartyField) {
              const partyInput = document.getElementById("party");
              partyInput.classList.add("requiredField");
            } else {
              const otherPartyInput = document.getElementById("otherParty");
              otherPartyInput.classList.add("requiredField");
            }
            checksPassed = false;
          }
          if (!voterRegistrationData.race.length > 0) {
            const raceInput = document.getElementById("race");
            raceInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (!voterRegistrationData.idNumber.length > 0) {
            const idInput = document.getElementById("idNumber");
            idInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (!checksPassed) {
            setError("Please complete all of the required fields");
            return;
          }
          setIsLoading(true);
          const {
            state,
            city,
            street,
            streetLine2,
            unit,
            name_first,
            name_last,
            dob,
            zip,
            email,
            citizen,
            eighteenPlus,
            party,
            idNumber,
          } = voterRegistrationData;
          let formattedAddress = street;
          if (streetLine2) {
            formattedAddress += ` ${streetLine2}`;
          }
          if (unit) {
            formattedAddress += ` ${unit}`;
          }
          const ymd = dob.split("-");
          const year = ymd[0];
          const month = ymd[1];
          const day = ymd[2];
          const formattedDob = `${month}/${day}/${year}`;
          const postBody = {
            state,
            city,
            street: formattedAddress,
            name_first,
            name_last,
            dob: formattedDob,
            zip,
            email,
            citizen: citizen ? "yes" : "no",
            eighteenPlus: eighteenPlus ? "yes" : "no",
            party,
            idNumber,
          };
          axios
            .post(`${apiUrl}/registertovote/`, postBody)
            .then((res) => {
              setIsLoading(false);
              completedAction("register to vote");
              history.push("/voterreg/completed");
            })
            .catch((e) => {
              setIsLoading(false);
              setError(
                `There was a problem creating your paperwork. ${e.response.data.error}.`
              );
            });
        }}
      >
        SUBMIT
      </button>
    </form>
  );
};
