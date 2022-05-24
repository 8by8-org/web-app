import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import "../../VoterRegistration.scss";
import { LoadingWheel } from "../../../LoadingWheel/LoadingWheel.component";
import { AddressBlock } from "./AddressBlock.component";
import { ProgressBar } from "../ProgressBar/ProgressBar.component";
import { useAuth } from "../../../../contexts/AuthContext";
import ScrollToTop from "../../../../functions/ScrollToTop";

const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const HomeAddress = () => {
  const history = useHistory();
  const {
    currentUser,
    currentUserData,
    voterRegistrationData,
    setVoterRegistrationData,
  } = useAuth();
  const [hasMailingAddress, setHasMailingAddress] = useState(false);
  const [hasChangeOfAddress, setHasChangeOfAddress] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /*redirect the user to the form completed page if they've already register to vote
  using the 8x8 app, or to the appropriate previous page if that information is incomplete
  */
  useEffect(() => {
    if (currentUserData.isRegisteredVoter) history.push("/voterreg/completed");
    else if (
      voterRegistrationData.zip.length === 0 ||
      voterRegistrationData.dob.length === 0
    ) {
      history.push("/voterreg/eligibility");
    } else if (
      voterRegistrationData.name_title.length === 0 ||
      voterRegistrationData.name_first.length === 0 ||
      voterRegistrationData.name_last.length === 0
    ) {
      history.push("/voterreg/yourname");
    }
  }, []);

  ScrollToTop();

  return (
    <form className="voterRegForm">
      <h1 className="register-form-title">
        <u className="underline">REGISTE</u>R TO VOTE
      </h1>
      <ProgressBar progressPercent={75} />
      {isLoading && <LoadingWheel overlay={true} />}
      <AddressBlock
        addressType={"home"}
        title="HOME ADDRESS"
        tooltipText="Provide your home address. Do not put your mailing address here if it’s different from your home address. Do not use a PO Box or rural route without a box number. If you live in a rural area but don’t have a street address or have no address, you can show where you live on a map later on the printed form."
      />
      {hasMailingAddress && (
        <AddressBlock addressType={"mailing"} title="MAILING ADDRESS" />
      )}
      {hasChangeOfAddress && (
        <AddressBlock addressType={"previous"} title="PREVIOUS ADDRESS" />
      )}
      <div>
        <label htmlFor="has_mailing_address" className="register-label">
          <input
            className="register-checkbox"
            type="checkbox"
            id="has_mailing_address"
            name="has_mailing_address"
            onChange={(event) => {
              setVoterRegistrationData({
                ...voterRegistrationData,
                has_mailing_address: event.target.checked,
              });
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
              setVoterRegistrationData({
                ...voterRegistrationData,
                change_of_address: event.target.checked,
              });
              setHasChangeOfAddress(event.target.checked);
            }}
          />
          I've changed my address since the last time I registered to vote
        </label>
      </div>
      <button
        className="next-btn"
        onClick={async (event) => {
          event.preventDefault();
          const {
            state,
            city,
            street,
            streetLine2,
            unit,
            name_first,
            name_last,
            dob,
            zip,
            has_mailing_address,
            mailing_state,
            mailing_city,
            mailing_zip,
            mailing_street,
            change_of_address,
            prev_state,
            prev_city,
            prev_zip,
            prev_street,
          } = voterRegistrationData;
          let checksPassed = true;
          if (state.length === 0) {
            const stateInput = document.getElementById("state");
            stateInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (city.length === 0) {
            const cityInput = document.getElementById("city");
            cityInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (street.length === 0) {
            const streetInput = document.getElementById("street");
            streetInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (zip.length === 0) {
            const zipInput = document.getElementById("zip");
            zipInput.classList.add("requiredField");
            checksPassed = false;
          }
          if (has_mailing_address) {
            if (mailing_state.length === 0) {
              const mailingStateInput =
                document.getElementById("mailing_state");
              mailingStateInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (mailing_city.length === 0) {
              const mailingCityInput = document.getElementById("mailing_city");
              mailingCityInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (mailing_street.length === 0) {
              const mailingStreetInput =
                document.getElementById("mailing_street");
              mailingStreetInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (mailing_zip.length === 0) {
              const mailingZipInput = document.getElementById("mailing_zip");
              mailingZipInput.classList.add("requiredField");
              checksPassed = false;
            }
          }
          if (change_of_address) {
            if (prev_state.length === 0) {
              const prevStateInput = document.getElementById("prev_state");
              prevStateInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (prev_city.length === 0) {
              const prevCityInput = document.getElementById("prev_city");
              prevCityInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (prev_street.length === 0) {
              const prevStreetInput = document.getElementById("prev_street");
              prevStreetInput.classList.add("requiredField");
              checksPassed = false;
            }
            if (prev_zip.length === 0) {
              const prevZipInput = document.getElementById("prev_zip");
              prevZipInput.classList.add("requiredField");
              checksPassed = false;
            }
          }
          if (!checksPassed) {
            setError("Please complete all of the required fields");
            return;
          }
          setIsLoading(true);
          const ymd = dob.split("-");
          const year = ymd[0];
          const month = ymd[1];
          const day = ymd[2];
          const formattedDob = `${month}/${day}/${year}`;
          let formattedAddress = street;
          if (streetLine2) {
            formattedAddress += ` ${streetLine2}`;
          }
          if (unit) {
            formattedAddress += ` ${unit}`;
          }
          const postBody = {
            state,
            city,
            street: formattedAddress,
            name_first,
            name_last,
            dob: formattedDob,
            zip,
          };
          try {
            const res = await axios.post(`${apiUrl}/registered/`, postBody);
            setIsLoading(false);
            const { registered } = res.data;
            if (registered) {
              setShowModal(true);
            } else {
              history.push("/voterreg/otherinfo");
            }
          } catch (e) {
            setIsLoading(false);
            history.push("/voterreg/otherinfo");
          }
        }}
      >
        NEXT
      </button>
      {showModal && (
        <div className="voter-reg-modal-outer-container">
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
                  Looks like you've already registered to vote. Do you still
                  want to continue?
                </p>
                <p className="voter-reg-modal-text">
                  If you keep going, you are registering again with your state.
                  Keep going if you’ve changed your party affiliation.
                </p>
                <button
                  className="voter-reg-modal-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/voterreg/otherinfo");
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
        </div>
      )}
    </form>
  );
};
