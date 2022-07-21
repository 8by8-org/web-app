import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { Tooltip } from "../Tooltip/Tooltip.component";
import { ProgressBar } from "../ProgressBar/ProgressBar.component";
import ScrollToTop from "../../../../functions/ScrollToTop";
import "../../VoterRegistration.scss";

export const YourName = () => {
  const history = useHistory();
  const { currentUserData, voterRegistrationData, setVoterRegistrationData } =
    useAuth();
  const [error, setError] = useState("");

  /*redirect user to form completed page if they have already completed the flow, 
  and to eligibility page if that information isn't complete
  */
  useEffect(() => {
    if (currentUserData.isRegisteredVoter) history.push("/voterreg/completed");
    if (
      voterRegistrationData.zip.length === 0 ||
      voterRegistrationData.dob.length === 0
    )
      history.push("/voterreg/eligibility");
  }, []);

  ScrollToTop();

  //determines whether floating label should float up
  const [activeFields, setActiveFields] = useState({
    name_first:
      voterRegistrationData.name_first &&
      voterRegistrationData.name_first.length > 0,
    name_middle:
      voterRegistrationData.name_middle &&
      voterRegistrationData.name_middle.length > 0,
    name_last:
      voterRegistrationData.name_last &&
      voterRegistrationData.name_last.length > 0,
    suffix:
      voterRegistrationData.suffix && voterRegistrationData.suffix.length > 0,
    prev_name_first:
      voterRegistrationData.prev_name_first &&
      voterRegistrationData.prev_name_first.length > 0,
    prev_name_middle:
      voterRegistrationData.prev_name_middle &&
      voterRegistrationData.prev_name_middle.length > 0,
    prev_name_last:
      voterRegistrationData.prev_name_last &&
      voterRegistrationData.prev_name_last.length > 0,
    prev_name_suffix:
      voterRegistrationData.prev_name_suffix &&
      voterRegistrationData.prev_name_suffix.length > 0,
  });

  return (
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">REGISTER TO VOTE</u>
      </h1>
      <ProgressBar progressPercent={50} />
      <div className="horizontalContainer">
        <h2 className="register-form-title-small">YOUR NAME </h2>
        <Tooltip text="Put your full name in these boxes. Please do not use nicknames or initials. If this application is for a change of name, you will be asked for your previous name in a later section. Don't forget to include your title (Mr., Mrs., Miss, Ms.)." />
      </div>
      <label htmlFor="title" className="floating-label-active">
        Title*
      </label>
      <select
        name="name_title"
        id="name_title"
        value={voterRegistrationData.name_title}
        className="register-input"
        onChange={(event) => {
          const titleInput = document.getElementById("name_title");
          titleInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            name_title: event.target.value,
          });
        }}
        required
      >
        <option value="">{""}</option>
        <option value="Mr.">Mr.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Miss">Miss</option>
        <option value="Ms.">Ms.</option>
        <option value="Sr.">Sr.</option>
        <option value="Sra.">Sra.</option>
        <option value="Srta.">Srta.</option>
      </select>
      <br />
      <label
        htmlFor="name_first"
        className={
          activeFields.name_first
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        First Name*
      </label>
      <input
        type="text"
        id="name_first"
        name="name_first"
        className="register-input"
        value={voterRegistrationData.name_first}
        //label should float up when the field is clicked on
        onClick={() => {
          setActiveFields({ ...activeFields, name_first: true });
        }}
        //label should float up when the field is tabbed to
        onFocus={() => {
          setActiveFields({ ...activeFields, name_first: true });
        }}
        onChange={(event) => {
          //label should float up in the event it is autocompleted
          setActiveFields({ ...activeFields, name_first: true });
          const fnameInput = document.getElementById("name_first");
          fnameInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            name_first: event.target.value,
          });
        }}
      />
      <br />
      <label
        htmlFor="name_middle"
        className={
          activeFields.name_middle
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Middle Name
      </label>
      <input
        type="text"
        id="name_middle"
        name="name_middle"
        className="register-input"
        value={voterRegistrationData.name_middle}
        onClick={() => {
          setActiveFields({ ...activeFields, name_middle: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, name_middle: true });
        }}
        onChange={(event) => {
          setActiveFields({ ...activeFields, name_middle: true });
          setVoterRegistrationData({
            ...voterRegistrationData,
            name_middle: event.target.name_middle,
          });
        }}
      />
      <br />
      <label
        htmlFor="name_last"
        className={
          activeFields.name_last
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Last name*
      </label>
      <input
        type="text"
        id="name_last"
        name="name_last"
        className="register-input"
        value={voterRegistrationData.name_last}
        onClick={() => {
          setActiveFields({ ...activeFields, name_last: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, name_last: true });
        }}
        onChange={(event) => {
          setActiveFields({ ...activeFields, name_last: true });
          const lnameInput = document.getElementById("name_last");
          lnameInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            name_last: event.target.value,
          });
        }}
        required
      />
      <br />
      <label
        htmlFor="suffix"
        className={
          activeFields.suffix
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Suffix
      </label>
      <input
        type="text"
        id="suffix"
        name="suffix"
        className="register-input"
        onClick={() => {
          setActiveFields({ ...activeFields, suffix: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, suffix: true });
        }}
        value={voterRegistrationData.suffix}
        onChange={(event) => {
          setActiveFields({ ...activeFields, suffix: true });
          setVoterRegistrationData({
            ...voterRegistrationData,
            suffix: event.target.value,
          });
        }}
      />
      <br />
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          id="change_of_name"
          name="change_of_name"
          className="register-checkbox"
          onChange={(event) => {
            setVoterRegistrationData({
              ...voterRegistrationData,
              change_of_name: event.target.checked,
            });
          }}
        />
        <label htmlFor="change_of_name" className="register-label">
          I've changed my name.
        </label>
        <Tooltip text="If you have changed your name since your last registration, check this box and enter your previous name below." />
      </div>
      <br />
      {voterRegistrationData.change_of_name && (
        <>
          <h2 className="register-form-title-small">PREVIOUS NAME</h2>
          <label htmlFor="prev_name_title" className="floating-label-active">
            Title*
          </label>
          <select
            name="prev_name_title"
            id="prev_name_title"
            className="register-input"
            value={voterRegistrationData.prev_name_title}
            onChange={(event) => {
              const prevTitleInput = document.getElementById("prev_name_title");
              prevTitleInput.classList.remove("requiredField");
              setVoterRegistrationData({
                ...voterRegistrationData,
                prev_name_title: event.target.value,
              });
            }}
            required
          >
            <option value="">{""}</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
            <option value="Ms.">Ms.</option>
            <option value="Sr.">Sr.</option>
            <option value="Sra.">Sra.</option>
            <option value="Srta.">Srta.</option>
          </select>
          <br />
          <label
            htmlFor="prev_name_first"
            className={
              activeFields.prev_name_first
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            First Name*
          </label>
          <input
            type="text"
            id="prev_name_first"
            name="prev_name_first"
            className="register-input"
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_first: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_first: true });
            }}
            value={voterRegistrationData.prev_name_first}
            onChange={(event) => {
              setActiveFields({ ...activeFields, prev_name_first: true });
              const prevFNameInput = document.getElementById("prev_name_first");
              prevFNameInput.classList.remove("requiredField");
              setVoterRegistrationData({
                ...voterRegistrationData,
                prev_name_first: event.target.value,
              });
            }}
          />
          <br />
          <label
            htmlFor="prev_name_middle"
            className={
              activeFields.prev_name_middle
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Middle Name
          </label>
          <input
            type="text"
            id="prev_name_middle"
            name="prev_name_middle"
            className="register-input"
            value={voterRegistrationData.prev_name_middle}
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_middle: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_middle: true });
            }}
            onChange={(event) => {
              setActiveFields({ ...activeFields, prev_name_middle: true });
              setVoterRegistrationData({
                ...voterRegistrationData,
                prev_name_middle: event.target.value,
              });
            }}
          />
          <br />
          <label
            htmlFor="prev_name_last"
            className={
              activeFields.prev_name_last
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Last name*
          </label>
          <input
            type="text"
            id="prev_name_last"
            name="prev_name_last"
            className="register-input"
            value={voterRegistrationData.prev_name_last}
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_last: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_last: true });
            }}
            onChange={(event) => {
              setActiveFields({ ...activeFields, prev_name_last: true });
              const prevLNameInput = document.getElementById("prev_name_last");
              prevLNameInput.classList.remove("requiredField");
              setVoterRegistrationData({
                ...voterRegistrationData,
                prev_name_last: event.target.value,
              });
            }}
            required
          />
          <br />
          <label
            htmlFor="prev_name_suffix"
            className={
              activeFields.prev_name_suffix
                ? "floating-label-active"
                : "floating-label-default"
            }
          >
            Suffix
          </label>
          <input
            type="text"
            id="prev_name_suffix"
            name="prev_name_suffix"
            value={voterRegistrationData.prev_name_suffix}
            className="register-input"
            onClick={() => {
              setActiveFields({ ...activeFields, prev_name_suffix: true });
            }}
            onFocus={() => {
              setActiveFields({ ...activeFields, prev_name_suffix: true });
            }}
            onChange={(event) => {
              setActiveFields({ ...activeFields, prev_name_suffix: true });
              setVoterRegistrationData({
                ...voterRegistrationData,
                prev_name_suffix: event.target.value,
              });
            }}
          />
          <br />
        </>
      )}
      <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
        {error}
      </p>
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          let checksPassed = true;
          if (voterRegistrationData.name_title.length === 0) {
            const titleInput = document.getElementById("name_title");
            titleInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (voterRegistrationData.name_first.length === 0) {
            const fnameInput = document.getElementById("name_first");
            fnameInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (voterRegistrationData.name_last.length === 0) {
            const lnameInput = document.getElementById("name_last");
            lnameInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (voterRegistrationData.change_of_name) {
            if (voterRegistrationData.prev_name_title.length === 0) {
              const prevTitleInput = document.getElementById("prev_name_title");
              prevTitleInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (voterRegistrationData.prev_name_first.length === 0) {
              const prevFNameInput = document.getElementById("prev_name_first");
              prevFNameInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (voterRegistrationData.prev_name_last.length === 0) {
              const prevLNameInput = document.getElementById("prev_name_last");
              prevLNameInput.classList.add("requiredField");
              checksPassed = false;
            }
          }
          if (!checksPassed) {
            setError("Please complete all of the required fields");
            return;
          }
          history.push("/voterreg/homeaddress");
        }}
      >
        Next
      </button>
    </form>
  );
};
