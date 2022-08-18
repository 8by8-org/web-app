import React, { useState, useRef, useEffect } from "react";
import "../../VoterRegistration.scss";
import "./AddressBlock.scss";
import { Tooltip } from "../Tooltip/Tooltip.component";
import { useAuth } from "../../../../../contexts/AuthContext";
import { checkAddressValidity } from "./utils";
import { LoadingWheelSm } from "./LoadingWheelSm.component";

export const AddressBlock = ({
  addressType,
  title,
  tooltipText,
  isValid,
  setIsValid,
}) => {
  //set the parent validity to false when a new, blank address block is rendered
  let prefix = "";
  if (addressType === "previous") prefix = "prev_";
  else if (addressType === "mailing") prefix = "mail_";

  const { voterRegistrationData, setVoterRegistrationData } = useAuth();

  const [activeFields, setActiveFields] = useState({
    street: voterRegistrationData[`${prefix}street`].length > 0,
    streetLine2: voterRegistrationData[`${prefix}streetLine2`].length > 0,
    unit: voterRegistrationData[`${prefix}unit`].length > 0,
    city: voterRegistrationData[`${prefix}city`].length > 0,
    state: voterRegistrationData[`${prefix}state`].length > 0,
    zip: voterRegistrationData[`${prefix}zip`].length > 0,
  });

  //holds a setTimeout function which fires after the user has stopped changing inputs and all inputs are complete
  const timeoutFunction = useRef(null);

  //0 = display nothing, 1 = loading, 2 = valid, 3 = failed
  const [validityStatus, setValidityStatus] = useState(0);

  const checkAddressOnChange = (field, value) => {
    setIsValid({ ...isValid, [addressType]: false });
    //clear the current timeout
    if (timeoutFunction.current) {
      clearTimeout(timeoutFunction.current);
    }
    timeoutFunction.current = setTimeout(() => {
      //check to see if any fields are incomplete
      const address = {
        street: voterRegistrationData[`${prefix}street`],
        streetLine2: voterRegistrationData[`${prefix}streetLine2`],
        unit: voterRegistrationData[`${prefix}unit`],
        city: voterRegistrationData[`${prefix}city`],
        state: voterRegistrationData[`${prefix}state`],
        zip: voterRegistrationData[`${prefix}zip`],
      };
      //get the most current value for the last field changed
      if (field && value) {
        address[field] = value;
      }
      if (
        address.street.length === 0 ||
        address.city.length === 0 ||
        address.state.length === 0 ||
        address.zip.length === 0
      ) {
        //if previously valid, mark as invalid, otherwise return
        if (validityStatus === 2) {
          setValidityStatus(3);
          setIsValid({ ...isValid, [addressType]: false });
        }
        return;
      }
      //if all fields are complete
      setValidityStatus(1); //set the validity status to loading
      checkAddressValidity(
        address,
        () => {
          setValidityStatus(2);
          setIsValid({ ...isValid, [addressType]: true });
        },
        () => {
          setValidityStatus(3);
          setIsValid({ ...isValid, [addressType]: false });
        }
      );
    }, 750);
  };

  useEffect(() => {
    checkAddressOnChange();
  }, []);

  return (
    <>
      <div className="horizontalContainer">
        <h2 className="register-form-title-small">{title}</h2>
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
      <label
        htmlFor={`${prefix}street`}
        className={
          activeFields.street
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Street Address*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}street`}
        name={`${prefix}street`}
        value={voterRegistrationData[`${prefix}street`]}
        //when the user clicks on the field, the label should float
        onClick={() => {
          setActiveFields({ ...activeFields, street: true });
        }}
        //when the user tabs to the field the label should float
        onFocus={() => {
          setActiveFields({ ...activeFields, street: true });
        }}
        onChange={(event) => {
          const streetInput = document.getElementById(`${prefix}street`);
          streetInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}street`]: event.target.value,
          });
          /*when the user selects a suggested address, and fields are autocompleted,
          the label should float
          */
          setActiveFields({ ...activeFields, street: true });
          checkAddressOnChange("street", event.target.value);
        }}
      />
      <br />
      <label
        htmlFor={`${prefix}street_line_2`}
        className={
          activeFields.streetLine2
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        Address Line 2
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}street_line_2`}
        name={`${prefix}street_line_2`}
        value={voterRegistrationData[`${prefix}streetLine2`]}
        onClick={() => {
          setActiveFields({ ...activeFields, streetLine2: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, streetLine2: true });
        }}
        onChange={(event) => {
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}streetLine2`]: event.target.value,
          });
          setActiveFields({ ...activeFields, streetLine2: true });
          checkAddressOnChange("streetLine2", event.target.value);
        }}
      />
      <br />
      <label
        htmlFor={`${prefix}home_unit`}
        className={
          activeFields.unit ? "floating-label-active" : "floating-label-default"
        }
      >
        Unit #
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}home_unit`}
        name={`${prefix}home_unit`}
        value={voterRegistrationData[`${prefix}unit`]}
        onClick={() => {
          setActiveFields({ ...activeFields, unit: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, unit: true });
        }}
        onChange={(event) => {
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}unit`]: event.target.value,
          });
          setActiveFields({ ...activeFields, unit: true });
          checkAddressOnChange("unit", event.target.value);
        }}
      />
      <br />
      <label
        htmlFor={`${prefix}city`}
        className={
          activeFields.city ? "floating-label-active" : "floating-label-default"
        }
      >
        City*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}city`}
        name={`${prefix}city`}
        value={voterRegistrationData[`${prefix}city`]}
        onClick={() => {
          setActiveFields({ ...activeFields, city: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, city: true });
        }}
        onChange={(event) => {
          const cityInput = document.getElementById(`${prefix}city`);
          cityInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}city`]: event.target.value,
          });
          setActiveFields({ ...activeFields, city: true });
          checkAddressOnChange("city", event.target.value);
        }}
      />
      <br />
      <label
        htmlFor={`${prefix}state`}
        className={
          addressType === "home"
            ? "register-label"
            : activeFields.state
            ? "floating-label-active"
            : "floating-label-default"
        }
      >
        State
      </label>
      <select
        className="register-input"
        id={`${prefix}state`}
        name={`${prefix}state`}
        value={voterRegistrationData[`${prefix}state`]}
        style={{
          color:
            addressType === "home" || activeFields.state ? "black" : "white",
        }}
        onClick={() => {
          setActiveFields({ ...activeFields, state: true });
        }}
        onFocus={() => {
          setActiveFields({ ...activeFields, state: true });
        }}
        onChange={(event) => {
          const stateInput = document.getElementById(`${prefix}state`);
          stateInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}state`]: event.target.value,
          });
          setActiveFields({ ...activeFields, state: true });
          checkAddressOnChange("state", event.target.value);
        }}
      >
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
      <br />
      <label
        htmlFor={`${prefix}zip`}
        className={
          activeFields.zip ? "floating-label-active" : "floating-label-default"
        }
      >
        Zip Code*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}zip`}
        name={`${prefix}zip`}
        value={voterRegistrationData[`${prefix}zip`]}
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
          const zipInput = document.getElementById(`${prefix}zip`);
          zipInput.classList.remove("requiredField");
          setVoterRegistrationData({
            ...voterRegistrationData,
            [`${prefix}zip`]: event.target.value,
          });
          setActiveFields({ ...activeFields, zip: true });
          checkAddressOnChange("zip", event.target.value);
        }}
      />
      <br />
      {(() => {
        switch (validityStatus) {
          case 0:
            return null;
          case 1:
            return (
              <p className="validating">
                <LoadingWheelSm /> validating address...
              </p>
            );
          case 2:
            return <p className="isValid">✔ validated address</p>;
          case 3:
            return <p className="invalid">✖ invalid address</p>;
          default:
            return null;
        }
      })()}
      <br />
    </>
  );
};
