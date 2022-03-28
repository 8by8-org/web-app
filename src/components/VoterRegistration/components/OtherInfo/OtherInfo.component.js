import React, { useState } from "react";
import axios from "axios";
import "../../VoterRegistration.scss";
import { Tooltip } from "../Tooltip/Tooltip.component";

const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const OtherInfo = ({ parentRef, setParentState }) => {
  const [showOtherPartyField, setShowOtherPartyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    party: parentRef.current.party,
    race: parentRef.current.race,
    idNumber: parentRef.current.idNumber,
  });
  const [activeFields, setActiveFields] = useState({
    party: parentRef.current.party && parentRef.current.party.length > 0,
    otherParty: false,
    race: parentRef.current.race && parentRef.current.race.length > 0,
    idNumber:
      parentRef.current.idNumber && parentRef.current.idNumber.length > 0,
  });

  return (
    <>
      <h2 className="register-form-title-small">OTHER DETAILS</h2>
      <label
        htmlFor="party"
        className={
          activeFields.party
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Political Party
      </label>
      <select
        className="register-input"
        required
        name="party"
        id="party"
        style={{ color: activeFields.party ? "black" : "white" }}
        onClick={() => {
          setActiveFields({ ...activeFields, party: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, party: true });
        }}
        onChange={({ target }) => {
          const { value } = target;
          if (value === "other") {
            setShowOtherPartyField(true);
          } else {
            setShowOtherPartyField(false);
            parentRef.current = {
              ...parentRef.current,
              party: value,
            };
            setFormData({ ...formData, party: value });
          }
        }}
      >
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
            value={formData.party}
            onFocus={() => {
              setActiveFields({ ...activeFields, otherParty: true });
            }}
            onChange={({ target }) => {
              parentRef.current = {
                ...parentRef.current,
                party: target.value,
              };
              setFormData({ ...formData, party: target.value });
            }}
          />
          <br />
        </>
      )}
      <div className="horizontalContainer">
        <div className="verticalContainer">
          <label
            htmlFor="race"
            className={
              activeFields.race
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Race*
          </label>
          <select
            className="register-input"
            id="race"
            style={{ color: activeFields.race ? "black" : "white" }}
            onClick={() => {
              setActiveFields({ ...activeFields, race: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, race: true });
            }}
            onChange={({ target }) => {
              parentRef.current = { ...parentRef.current, race: target.value };
              setFormData({ ...formData, race: target.value });
            }}
          >
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
        ID Number
      </label>
      <input
        className="register-input"
        type="text"
        name="idNumber"
        id="idNumber"
        onClick={() => {
          setActiveFields({ ...activeFields, idNumber: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, idNumber: true });
        }}
        onChange={({ target }) => {
          parentRef.current = { ...parentRef.current, idNumber: target.value };
          setFormData({ ...formData, idNumber: target.value });
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
          const {
            state,
            city,
            street,
            name_first,
            name_last,
            dob,
            zip,
            email,
            citizen,
            eighteenPlus,
            party,
            idNumber,
          } = parentRef.current;
          const ymd = dob.split("-");
          const year = ymd[0];
          const month = ymd[1];
          const day = ymd[2];
          const formattedDob = `${month}/${day}/${year}`;
          const postBody = {
            state,
            city,
            street,
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
          //create a pdf for the user to mail to their state
          axios
            .post(`${apiUrl}/registertovote/`, postBody)
            .then((res) => {
              console.log(res);
              setIsLoading(false);
              setParentState("formCompleted");
            })
            .catch((e) => {
              setIsLoading(false);
              setError(
                "There was a problem creating your paperwork. Please ensure that all of your information is entered correctly."
              );
            });
        }}
      >
        SUBMIT
      </button>
    </>
  );
};
