import React, { useState } from "react";
// import ZipCodeData from "zipcode-data";

export const HomeAddress = ({ parentRef, setParentState }) => {
  const [hasMailingAddress, setHasMailingAddress] = useState(false);
  const [hasChangeOfAddress, setHasChangeOfAddress] = useState(false);
  const [formData, setFormData] = useState({
    home_address: "",
    home_address_line_2: "",
    home_unit: "",
    home_city: "",
    home_state_id: "",
    home_zip_code: "",
    prev_home_address: "",
    prev_home_address_line_2: "",
    prev_home_unit: "",
    prev_home_city: "",
    prev_home_state_id: "",
    prev_home_zip_code: "",
    mailing_home_address: "",
    mailing_home_address_line_2: "",
    mailing_home_unit: "",
    mailing_home_city: "",
    mailing_home_state_id: "",
    mailing_home_zip_code: "",
  });

  const AddressBlock = ({ addressType }) => {
    let prefix = "";
    if (addressType === "previous") prefix = "prev_";
    else if (addressType === "mailing") prefix = "mailing_";

    return (
      <>
        <label htmlFor={`${prefix}home_address`} className="register-label">
          Street Address*
        </label>
        <input
          className="register-input"
          type="text"
          id={`${prefix}home_address`}
          name={`${prefix}home_address`}
          value={formData[`${prefix}home_address`]}
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_address`]: event.target.value,
            };
            setFormData({
              ...formData,
              [`${prefix}home_address`]: event.target.value,
            });
          }}
        />
        <br />
        <label
          htmlFor={`${prefix}home_address_line_2`}
          className="register-label"
        >
          Address Line 2
        </label>
        <input
          className="register-input"
          type="text"
          id={`${prefix}home_address_line_2`}
          name={`${prefix}home_address_line_2`}
          value={formData[`${prefix}home_address_line_2`]}
          onChange={(event) => {
            const fullAddress =
              formData[`${prefix}home_address`] + ", " + event.target.value;
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_address`]: fullAddress,
            };
            setFormData({
              ...formData,
              [`${prefix}home_address_line_2`]: event.target.value,
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
          value={formData[`${prefix}home_unit`]}
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_unit`]: event.target.value,
            };
            setFormData({
              ...formData,
              [`${prefix}home_unit`]: event.target.value,
            });
          }}
        />
        <br />
        <label htmlFor={`${prefix}home_city`} className="register-label">
          City*
        </label>
        <input
          className="register-input"
          type="text"
          id={`${prefix}home_city`}
          name={`${prefix}home_city`}
          value={formData[`${prefix}home_city`]}
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_city`]: event.target.value,
            };
            setFormData({
              ...formData,
              [`${prefix}home_city`]: event.target.value,
            });
          }}
        />
        <br />
        <label htmlFor={`${prefix}home_state_id`} className="register-label">
          State
        </label>
        <select
          className="register-input"
          id={`${prefix}home_state_id`}
          name={`${prefix}home_state_id`}
          value={
            // parentRef.home_zip_code
            //   ? ZipCodeData.stateFromZip(parentRef.home_zip_code)
            //   : "CA"
            formData[`${prefix}home_state_id`]
          }
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_state_id`]: event.target.value,
            };
            setFormData({
              ...formData,
              [`${prefix}home_state_id`]: event.target.value,
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
        <label htmlFor={`${prefix}home_zip_code`} className="register-label">
          Zip Code*
        </label>
        <input
          className="register-input"
          type="text"
          id={`${prefix}home_zip_code`}
          name={`${prefix}home_zip_code`}
          value={formData[`${prefix}home_zip_code`]}
          onChange={(event) => {
            parentRef.current = {
              ...parentRef.current,
              [`${prefix}home_zip_code`]: event.target.value,
            };
            setFormData({
              ...formData,
              [`${prefix}home_zip_code`]: event.target.value,
            });
          }}
        />
        <br />
      </>
    );
  };

  return (
    <>
      <h2 className="register-form-title-small">HOME ADDRESS</h2>
      <AddressBlock addressType={"home"} />
      {hasMailingAddress && <AddressBlock addressType={"mailing"} />}
      {hasChangeOfAddress && <AddressBlock addressType={"previous"} />}
      <div>
        <label htmlFor="has_mailing_address" className="register-label">
          <input
            className="register-checkbox"
            type="checkbox"
            id="has_mailing_address"
            name="has_mailing_address"
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                has_mailing_address: event.target.checked,
              };
              setHasMailingAddress(event.target.checked);
            }}
          />
          I get my mail at a different mailing address from the one shown above
        </label>
      </div>
      <div>
        <label htmlFor="change_of_address" className="register-label">
          <input
            className="register-checkbox"
            type="checkbox"
            id="change_of_address"
            name="change_of_address"
            onChange={(event) => {
              parentRef.current = {
                ...parentRef.current,
                change_of_address: event.target.checked,
              };
              setHasChangeOfAddress(event.target.checked);
            }}
          />
          I've changed my address since the last time I registered to vote
        </label>
      </div>
      <button
        className="next-btn"
        onClick={(event) => {
          event.preventDefault();
          //need to add guards here
          setParentState("otherInfo");
        }}
      >
        NEXT
      </button>
    </>
  );
};
