import React, { useState, useRef } from "react";
import {
  Eligibility,
  YourName,
  HomeAddress,
  OtherInfo,
  FormCompleted,
  ProgressBar,
} from "./components";
import { useAuth } from "../../contexts/AuthContext";
import "./VoterRegistration.scss";

export default function VoterRegistrationForm(props) {
  // const { currentUser } = useAuth();
  const [page, setPage] = useState("eligibility");
  const formData = useRef({
    send_confirmation_reminder_emails: false,
    dob: "", //renamed from date_of_birth to match us votes api
    idNumber: "", //renamed from id_number to match us votes api
    email: "dvorakjt@gmail.com", //currentUser.email, //renamed from email_address to match us votes api
    first_registration: false,
    zip: "", //renamed from home_zip_code to match us votes api
    citizen: false, //renamed from us_citizen to match us votes api
    has_state_license: false,
    eighteenPlus: false, //renamed from is_eighteen_or_older to match us votes api
    name_title: "", //Required. Must be one of “Mr.”, “Mrs.”, “Miss”, “Ms.”, “Sr.”, “Sra.”, “Srta.”
    name_first: "", //renamed from first_name to match us votes api
    name_middle: "",
    name_last: "", //renamed from last_name to match us votes api
    street: "", //renamed from home_address to match us votes api
    home_unit: "",
    city: "", //renamed from home_city to match us votes api
    state: "", //renamed from home_state_id to match us votes api
    has_mailing_address: false,
    mailing_address: "",
    mailing_unit: "",
    mailing_city: "",
    mailing_state_id: "",
    mailing_zip_code: "",
    phone: "Home",
    change_of_name: false,
    prev_name_title: "",
    prev_name_first: "",
    prev_name_middle: "",
    prev_name_last: "",
    change_of_address: false,
    prev_address: "",
    prev_unit: "",
    prev_city: "",
    prev_state_id: "",
    prev_zip_code: "",
    opt_in_email: false,
    opt_in_sms: false,
    opt_in_volunteer: false,
    party: "", //renamed from political_party to match us votes api
    race: "",
  });

  return (
    <form className="container">
      <h1 className="register-form-title">
        <span className="underline">REGISTE</span>R TO VOTE
      </h1>
      <ProgressBar page={page} />
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
            return <FormCompleted />;
        }
      })()}
    </form>
  );
}
