import React, { useState, useRef } from "react";
import { Eligibility, YourName, HomeAddress, OtherInfo } from "./components";
import { useAuth } from "../../contexts/AuthContext";
import "./VoterRegistration.scss";

export default function VoterRegistrationForm(props) {
  const { currentUser } = useAuth();
  const [page, setPage] = useState("eligibility");
  const formData = useRef({
    send_confirmation_reminder_emails: false,
    date_of_birth: "",
    id_number: "",
    email_address: currentUser.email,
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
    phone: "Home",
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
    political_party: "",
    race: "",
  });

  return (
    <form className="container">
      <h1 className="register-form-title">
        <span className="underline">REGISTE</span>R TO VOTE
      </h1>
      {(() => {
        switch (page) {
          case "eligibility":
            return (
              <Eligibility parentRef={formData} setParentState={setPage} />
            );
          case "yourName":
            return <YourName parentRef={formData} setParentState={setPage} />;
          case "homeAddress":
            return (
              <HomeAddress parentRef={formData} setParentState={setPage} />
            );
          case "otherInfo":
            return <OtherInfo parentRef={formData} setParentState={setPage} />;
          case "formCompleted":
            return <h1>Form Complete</h1>;
        }
      })()}
    </form>
  );
}
