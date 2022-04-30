import React, { useState } from "react";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import { useAuth } from "../../../../contexts/AuthContext";
import "../../VoterRegistration.scss";
import ZipCodeData from "zipcode-data";
import { getAge, getEligibility } from "../../utils";
import { Tooltip } from "../Tooltip/Tooltip.component";

const ERROR_MESSAGES = [
  "",
  "Please complete all of the required fields.",
  "You must be a US Citizen to vote.",
  "Please enter a valid US zipcode.",
];

export const Eligibility = ({ parentRef, setParentState }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    zip: "",
    dob: "",
    citizen: false,
    eighteenPlus: false,
  });
  const [activeFields, setActiveFields] = useState({
    zip: formData.zip.length > 0,
    dob: formData.dob.length > 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [eligibility, setEligibility] = useState({
    eligibility: "",
    message: "",
  });
  const [errorCode, setErrorCode] = useState(0);

  return (
    <>
      <p>Registering to vote is easy, and only takes a few minutes!</p>
      <h2 className="register-form-title-small">ELIGIBILITY</h2>
      <label className="register-label">Email</label>
      <p className="register-input">{parentRef.current.email}</p>
      <br />
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
        value={formData.dob}
        style={{
          color: activeFields.dob ? "black" : "white",
          transition: "color 250ms 150ms ease-out",
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, dob: true });
        }}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            dob: event.target.value,
          };
          setFormData({ ...formData, dob: event.target.value });
          if (
            event.target.value &&
            parentRef.current.state &&
            parentRef.current.state.length > 0
          ) {
            setEligibility(
              getEligibility(event.target.value, parentRef.current.state)
            );
          }
        }}
        required
      />
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
        value={formData.zip}
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

            parentRef.current = {
              ...parentRef.current,
              zip: zip,
              state: state,
            };
            setFormData({ ...formData, zip: zip });
            //if the user has entered their dob and if their state was found, set their eligibility
            if (formData.dob && state.length > 0) {
              setEligibility(getEligibility(formData.dob, state));
            }
          }
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
      <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
        {ERROR_MESSAGES[errorCode]}
      </p>
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          if (formData.dob.length === 0 || formData.zip.length === 0) {
            setErrorCode(1);
            return;
          }
          if (!formData.citizen) {
            setErrorCode(2);
            return;
          }
          if (!ZipCodeData.lookupZip(formData.zip)) {
            setErrorCode(3);
            return;
          }
          if (eligibility.eligibility === "eligible")
            setParentState("yourName");
          else if (
            eligibility.eligibility === "preregister" ||
            eligibility.eligibility === "underage"
          ) {
            setShowModal(true);
          }
        }}
      >
        NEXT
      </button>
      {showModal && (
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
              <p className="voter-reg-modal-text">{eligibility.message}</p>
              <button
                className="voter-reg-modal-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setParentState("yourName");
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
      )}
    </>
  );
};
