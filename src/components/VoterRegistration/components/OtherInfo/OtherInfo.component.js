import React, { useState } from "react";
import "../../VoterRegistration.scss";

export const OtherInfo = ({ parentRef, setParentState }) => {
  const [showOtherPartyField, setShowOtherPartyField] = useState(false);
  const [formData, setFormData] = useState({
    political_party: parentRef.current.political_party,
    race: parentRef.current.race,
    id_number: parentRef.current.id_number,
  });

  return (
    <>
      <h2 className="register-form-title-small">OTHER DETAILS</h2>
      <label htmlFor="political_party" className="register-label">
        Political Party
      </label>
      <select
        className="register-input"
        required
        name="political_party"
        id="political_party"
        onChange={({ target }) => {
          const { value } = target;
          if (value === "other") {
            setShowOtherPartyField(true);
          } else {
            setShowOtherPartyField(false);
            parentRef.current = {
              ...parentRef.current,
              political_party: value,
            };
            setFormData({ ...formData, political_party: value });
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
            value={formData.political_party}
            onChange={({ target }) => {
              parentRef.current = {
                ...parentRef.current,
                political_party: target.value,
              };
              setFormData({ ...formData, political_party: target.value });
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
      <label htmlFor="id_number" className="register-label">
        ID Number
      </label>
      <input
        className="register-input"
        type="text"
        name="id_number"
        id="id_number"
        onChange={({ target }) => {
          parentRef.current = { ...parentRef.current, id_number: target.value };
          setFormData({ ...formData, id_number: target.value });
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
        onClick={(event) => {
          event.preventDefault();
          console.log(parentRef.current);
        }}
      >
        SUBMIT
      </button>
    </>
  );
};
