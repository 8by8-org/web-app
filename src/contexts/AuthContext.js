import React, { useContext, useEffect, useState } from "react";
import { getUserDatabaseByUID } from "../functions/UserData";
import { auth } from "../firebase";

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  //keep track of user data in the context to limit calls to firestore
  const [currentUserData, setCurrentUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  //error handling
  const [error, setError] = useState(null);
  /*keep track of voter reg form data here so that the flow can be spread out over several
  discrete pages*/
  const [voterRegistrationData, setVoterRegistrationData] = useState({
    send_confirmation_reminder_emails: false,
    dob: "",
    idNumber: "",
    email: "",
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
    streetLine2: "",
    unit: "",
    city: "",
    state: "AL",
    has_mailing_address: false,
    mailing_street: "",
    mailing_streetLine2: "",
    mailing_unit: "",
    mailing_city: "",
    mailing_state: "AL",
    mailing_zip: "",
    phone: "Home",
    change_of_name: false,
    prev_name_title: "",
    prev_name_first: "",
    prev_name_middle: "",
    prev_name_last: "",
    change_of_address: false,
    prev_street: "",
    prev_streetLine2: "",
    prev_unit: "",
    prev_city: "",
    prev_state: "AL",
    prev_zip: "",
    opt_in_email: false,
    opt_in_sms: false,
    opt_in_volunteer: false,
    party: "",
    race: "",
  });

  useEffect(() => {
    const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
      setError(null);
      setCurrentUser(user);
      //refresh voter registration data
      setVoterRegistrationData({
        dob: "",
        idNumber: "",
        email: user ? user.email : "",
        first_registration: false,
        zip: "",
        citizen: false,
        has_state_license: false,
        eighteenPlus: false,
        title: "",
        name_first: "",
        name_middle: "",
        name_last: "",
        suffix: "",
        street: "",
        streetLine2: "",
        unit: "",
        city: "",
        state: "AL",
        diff_mailing_address: false,
        mail_street: "",
        mail_streetLine2: "",
        mail_unit: "",
        mail_city: "",
        mail_state: "AL",
        mail_zip: "",
        change_of_name: false,
        prev_title: "",
        prev_name_first: "",
        prev_name_middle: "",
        prev_name_last: "",
        prev_suffix: "",
        change_of_address: false,
        prev_street: "",
        prev_streetLine2: "",
        prev_unit: "",
        prev_city: "",
        prev_state: "AL",
        prev_zip: "",
        party: "",
        race: "",
      });
      //if a user has been found, get the current user's information from firestore
      if (user) {
        getUserDatabaseByUID(user.uid)
          .then((userData) => {
            setCurrentUserData(userData);
            setAuthLoading(false);
          })
          .catch((e) => {
            //set an error state to the error message, and set authLoading to false
            setError(e.message);
            setAuthLoading(false);
          });
      } else {
        //if no user was found, set currentUserData to null and authLoading to false
        setCurrentUserData(null);
        setAuthLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserData,
    setCurrentUserData,
    voterRegistrationData,
    setVoterRegistrationData,
  };
  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}
