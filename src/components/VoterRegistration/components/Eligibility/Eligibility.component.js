import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";

export const Eligibility = ({ parentRef, setParentState }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    zip: "",
    dob: "",
    citizen: false,
    eighteenPlus: false,
  });

  return (
    <>
      <p>Registering to vote is easy, and only takes a few minutes!</p>
      <h2 className="register-form-title-small">ELIGIBILITY</h2>
      <label className="register-label">Email</label>
      <p>{currentUser.email}</p>
      <label className="register-label">Date of Birth*</label>
      <input
        className="register-input"
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            dob: event.target.value,
          };
          setFormData({ ...formData, dob: event.target.value });
        }}
        required
      />
      <br />
      <label for="zip" className="register-label">
        Zip Code*
      </label>
      <input
        className="register-input"
        type="text"
        id="zip"
        name="zip"
        value={formData.zip}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            zip: event.target.value,
          };
          setFormData({ ...formData, zip: event.target.value });
        }}
        required
      />
      <br />
      <div>
        <input
          className="register-checkbox"
          type="checkbox"
          id="citizen"
          name="citizen"
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              citizen: event.target.checked,
            };
            setFormData({ ...formData, citizen: event.target.checked });
          }}
          required
        />
        <label htmlFor="citizen" className="register-label">
          I am a US Citizen*
        </label>
      </div>
      <div>
        <input
          className="register-checkbox"
          type="checkbox"
          id="eighteenPlus"
          name="eighteenPlus"
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              eighteenPlus: event.target.checked,
            };
            setFormData({
              ...formData,
              eighteenPlus: event.target.checked,
            });
          }}
          required
        />
        <label htmlFor="eighteenPlus" className="register-label">
          I will be 18 or older by the time of the next election.*
        </label>
      </div>
      <br />
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          //need to add guards here
          setParentState("yourName");
        }}
      >
        NEXT
      </button>
    </>
  );
};
