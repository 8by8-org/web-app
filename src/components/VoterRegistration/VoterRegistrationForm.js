import React, { useState, useEffect, useRef } from "react";
import {
  Eligibility,
  YourName,
  HomeAddress,
  OtherInfo,
  FormCompleted,
  ProgressBar,
} from "./components";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { addInvitedBy } from "../../functions/AddInvite";
import { LoadingWheel } from "../LoadingWheel/LoadingWheel.component";
import "./VoterRegistration.scss";
const db = getFirestore();

export default function VoterRegistrationForm(props) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  //if the user has already completed the register to vote action, set the page to "formCompleted"
  const [page, setPage] = useState("loading");
  useEffect(() => {
    //when the page loads, check if the user has already registered to vote
    setTimeout(() => {
      if (localStorage.getItem("player") && currentUser) {
        addInvitedBy();
        setLoading(true);
      } else {
        setLoading(true);
      }
      (async () => {
        const userRef = doc(db, "users", currentUser.uid);
        const user = await getDoc(userRef);
        const uData = user.data();
        if (uData.isRegisteredVoter) {
          setPage("formCompleted");
        } else setPage("eligibility");
      })();
    }, 3000);
  }, []);
  const formData = useRef({
    send_confirmation_reminder_emails: false,
    dob: "",
    idNumber: "",
    email: currentUser.email,
    first_registration: false,
    zip: "",
    citizen: false,
    has_state_license: false,
    eighteenPlus: false,
    name_title: "",
    name_first: "",
    name_middle: "",
    name_last: "",
    street: "",
    home_unit: "",
    city: "",
    state: "",
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
    party: "", //default values so <select> tags work as expected
    race: "",
  });

  return loading ? (
    <form className={page !== "loading" && "container"}>
      {page !== "loading" && (
        <h1 className="register-form-title">
          {page !== "formCompleted" ? (
            <>
              <u className="underline">REGISTE</u>R TO VOTE
            </>
          ) : (
            <>
              <u className="underline">YOU COMPLETE</u>D THE FORM
            </>
          )}
        </h1>
      )}
      {page !== "formCompleted" && page !== "loading" && (
        <ProgressBar page={page} />
      )}
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
          case "loading":
            return <LoadingWheel overlay={false} />;
        }
      })()}
    </form>
  ) : (
    <LoadingWheel overlay={false}/>
  )
}
