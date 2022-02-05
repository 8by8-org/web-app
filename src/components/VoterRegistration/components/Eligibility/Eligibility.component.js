import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";

export const Eligibility = ({ parentRef, setParentState }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    home_zip_code: "",
    date_of_birth: "",
    us_citizen: false,
    is_eighteen_or_older: false,
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
        id="date_of_birth"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            date_of_birth: event.target.value,
          };
          setFormData({ ...formData, date_of_birth: event.target.value });
        }}
        required
      />
      <br />
      <label for="home_zip_code" className="register-label">
        Zip Code*
      </label>
      <input
        className="register-input"
        type="text"
        id="home_zip_code"
        name="home_zip_code"
        value={formData.home_zip_code}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            home_zip_code: event.target.value,
          };
          setFormData({ ...formData, home_zip_code: event.target.value });
        }}
        required
      />
      <br />
      <div>
        <input
          className="register-checkbox"
          type="checkbox"
          id="us_citizen"
          name="us_citizen"
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              us_citizen: event.target.checked,
            };
            setFormData({ ...formData, us_citizen: event.target.checked });
          }}
          required
        />
        <label htmlFor="us_citizen" className="register-label">
          I am a US Citizen*
        </label>
      </div>
      <div>
        <input
          className="register-checkbox"
          type="checkbox"
          id="is_eighteen_or_older"
          name="is_eighteen_or_older"
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              is_eighteen_or_older: event.target.checked,
            };
            setFormData({
              ...formData,
              is_eighteen_or_older: event.target.checked,
            });
          }}
          required
        />
        <label htmlFor="is_eighteen_or_older" className="register-label">
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
