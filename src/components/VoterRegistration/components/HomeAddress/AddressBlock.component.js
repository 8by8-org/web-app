import React, { useState } from "react";

export const AddressBlock = ({ addressType, parentRef }) => {
  const [formData, setFormData] = useState({
    street: "",
    streetLine2: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
  });

  let prefix = "";
  if (addressType === "previous") prefix = "prev_";
  else if (addressType === "mailing") prefix = "mailing_";

  return (
    <>
      <label htmlFor={`${prefix}street`} className="register-label">
        Street Address*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}street`}
        name={`${prefix}street`}
        value={formData.street}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}street`]: event.target.value,
          };
          setFormData({
            ...formData,
            street: event.target.value,
          });
        }}
      />
      <br />
      <label htmlFor={`${prefix}street_line_2`} className="register-label">
        Address Line 2
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}street_line_2`}
        name={`${prefix}street_line_2`}
        value={formData.streetLine2}
        onChange={(event) => {
          const fullAddress =
            formData.street + ", " + event.target.value + formData.unit.length >
            0
              ? `, ${formData.unit}`
              : "";
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}street`]: fullAddress,
          };
          setFormData({
            ...formData,
            streetLine2: event.target.value,
          });
        }}
      />
      <br />
      <label htmlFor={`${prefix}home_unit`} className="register-label">
        Unit #
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}home_unit`}
        name={`${prefix}home_unit`}
        value={formData.unit}
        onChange={(event) => {
          const fullAddress =
            formData.street +
            ", " +
            (formData.streetLine2.length > 0
              ? `${formData.streetLine2}, `
              : "") +
            formData.unit;
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}street`]: fullAddress,
          };
          setFormData({
            ...formData,
            unit: event.target.value,
          });
        }}
      />
      <br />
      <label htmlFor={`${prefix}city`} className="register-label">
        City*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}city`}
        name={`${prefix}city`}
        value={formData.city}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}city`]: event.target.value,
          };
          setFormData({
            ...formData,
            city: event.target.value,
          });
        }}
      />
      <br />
      <label htmlFor={`${prefix}state`} className="register-label">
        State
      </label>
      <select
        className="register-input"
        id={`${prefix}state`}
        name={`${prefix}state`}
        value={
          // parentRef.zip
          //   ? ZipCodeData.stateFromZip(parentRef.zip)
          //   : "CA"
          formData.state
        }
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}state`]: event.target.value,
          };
          setFormData({
            ...formData,
            state: event.target.value,
          });
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
      <label htmlFor={`${prefix}zip`} className="register-label">
        Zip Code*
      </label>
      <input
        className="register-input"
        type="text"
        id={`${prefix}zip`}
        name={`${prefix}zip`}
        value={formData.zip}
        onChange={(event) => {
          parentRef.current = {
            ...parentRef.current,
            [`${prefix}zip`]: event.target.value,
          };
          setFormData({
            ...formData,
            zip: event.target.value,
          });
        }}
      />
      <br />
    </>
  );
};
