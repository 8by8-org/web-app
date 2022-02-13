import React, { useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import "../../VoterRegistration.scss";

const apiUrl = "https://usvotes-3ulcxuufea-uw.a.run.app/registertovote/";

export const OtherInfo = ({ parentRef, setParentState }) => {
  const [showOtherPartyField, setShowOtherPartyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    party: parentRef.current.party,
    race: parentRef.current.race,
    idNumber: parentRef.current.idNumber,
  });

  return (
    <>
      <h2 className="register-form-title-small">OTHER DETAILS</h2>
      <label htmlFor="party" className="register-label">
        Political Party
      </label>
      <select
        className="register-input"
        required
        name="party"
        id="party"
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
          <label className="register-label">Other Political Party*</label>
          <input
            required
            className="register-input"
            type="text"
            value={formData.party}
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
      <label htmlFor="race" className="register-label">
        Race*
      </label>
      <select
        className="register-input"
        id="race"
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
      <br />
      <label htmlFor="idNumber" className="register-label">
        ID Number
      </label>
      <input
        className="register-input"
        type="text"
        name="idNumber"
        id="idNumber"
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
      <button
        className="next-btn"
        disabled={isLoading}
        onClick={(event) => {
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
          console.log(postBody);
          setIsLoading(true);
          axios
            .post(apiUrl, postBody)
            .then((res) => {
              setIsLoading(false);
              setParentState("formCompleted");
            })
            .catch((e) => {
              setIsLoading(false);
              setError(e);
            });
        }}
      >
        {isLoading && (
          <BeatLoader
            color={"lightgray"}
            loading={isLoading}
            size={20}
            style={{ marginTop: "4px", marginRight: "8px" }}
          />
        )}
        SUBMIT
      </button>
    </>
  );
};
