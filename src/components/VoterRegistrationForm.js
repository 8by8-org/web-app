import React, { useState } from "react";

export default function VoterRegistrationForm(props) {
  const [formData, setFormData] = useState({
    send_confirmation_reminder_emails: false,
    date_of_birth: "",
    id_number: "",
    email_address: "",
    first_registration: false,
    home_zip_code: "",
    us_citizen: false,
    has_state_license: false,
    is_eighteen_or_older: false,
    name_title: "", //Required. Must be one of “Mr.”, “Mrs.”, “Miss”, “Ms.”, “Sr.”, “Sra.”, “Srta.”
    first_name: "",
    middle_name: "",
    last_name: "",
    home_address: "",
    home_unit: "",
    home_city: "",
    home_state_id: "",
    has_mailing_address: false,
    mailing_address: "",
    mailing_unit: "",
    mailing_city: "",
    mailing_state_id: "",
    mailing_zip_code: "",
    phone: "",
    change_of_name: false,
    prev_last_name: "",
    change_of_address: false,
    prev_address: "",
    prev_unit: "",
    prev_city: "",
    prev_state_id: "",
    prev_zip_code: "",
    opt_in_email: false,
    opt_in_sms: false,
    opt_in_volunteer: false,
  });

  return (
    <form>
      <label for="title">Title*</label>
      <br />
      <select
        name="title"
        id="title"
        value={formData.title}
        onChange={(event) => {
          setFormData({ title: event.target.value, ...formData });
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
      <label for="first_name">First Name*</label>
      <br />
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={(event) => {
          setFormData({ first_name: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label for="middle_name">Middle Name</label>
      <br />
      <input
        type="text"
        id="middle_name"
        name="middle_name"
        value={formData.middle_name}
        onChange={(event) => {
          setFormData({ middle_name: event.target.value, ...formData });
        }}
      />
      <br />
      <label for="last_name">Last name*</label>
      <br />
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={(event) => {
          setFormData({ last_name: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label>Date of Birth*</label>
      <br />
      <input
        type="date"
        id="date_of_birth"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={(event) => {
          setFormData({ date_of_birth: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <input
        type="checkbox"
        id="us_citizen"
        name="us_citizen"
        onChange={(event) => {
          if (event.target.checked)
            setFormData({ us_citizen: true, ...formData });
          else setFormData({ us_citizen: false, ...formData });
        }}
        required
      />
      <label for="us_citizen">I am a US Citizen*</label>
      <br />
      <input
        type="checkbox"
        id="is_eighteen_or_older"
        name="is_eighteen_or_older"
        onChange={(event) => {
          if (event.target.checked)
            setFormData({ is_eighteen_or_older: true, ...formData });
          else setFormData({ is_eighteen_or_older: false, ...formData });
        }}
        required
      />
      <label for="is_eighteen_or_older">
        I will be 18 or older by the time of the next election.*
      </label>
      <br />
      <label for="home_address">Street Address*</label>
      <br />
      <input
        type="text"
        id="home_address"
        name="home_address"
        value={formData.home_address}
        onChange={(event) => {
          setFormData({ home_address: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label for="home_unit">Address Line 2</label>
      <br />
      <input
        type="text"
        id="home_unit"
        name="home_unit"
        value={formData.home_unit}
        onChange={(event) => {
          setFormData({ home_unit: event.target.value, ...formData });
        }}
      />
      <br />
      <label for="home_city">City*</label>
      <br />
      <input
        type="text"
        id="home_city"
        name="home_city"
        value={formData.home_city}
        onChange={(event) => {
          setFormData({ home_city: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label for="home_state_id">State*</label>
      <br />
      <input
        type="text"
        id="home_state_id"
        name="home_state_id"
        value={formData.home_state_id}
        onChange={(event) => {
          setFormData({ home_state_id: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label for="home_zip_code">Zip Code*</label>
      <br />
      <input
        type="text"
        id="home_zip_code"
        name="home_zip_code"
        value={formData.home_zip_code}
        onChange={(event) => {
          setFormData({ home_zip_code: event.target.value, ...formData });
        }}
        required
      />
      <br />
      <label for="phone">Mobile Phone</label>
      <br />
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={(event) => {
          setFormData({ phone: event.target.value, ...formData });
        }}
      />
      <br />
      <label for="id_number">State ID Number*</label>
      <br />
      <input
        type="text"
        id="id_number"
        name="id_number"
        value={formData.id_number}
        onChange={(event) => {
          setFormData({ id_number: event.target.value, ...formData });
        }}
        required
      />
    </form>
  );
}
