import React, { useState } from "react";
import axios from "axios";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import "../../VoterRegistration.scss";
import { LoadingWheel } from "../../../LoadingWheel/LoadingWheel.component";
import { AddressBlock } from "./AddressBlock.component";

const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

export const HomeAddress = ({ parentRef, setParentState }) => {
  const [hasMailingAddress, setHasMailingAddress] = useState(false);
  const [hasChangeOfAddress, setHasChangeOfAddress] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {isLoading && <LoadingWheel overlay={true} />}
      <AddressBlock
        addressType={"home"}
        parentRef={parentRef}
        title="HOME ADDRESS"
        tooltipText="Provide your home address. Do not put your mailing address here if it’s different from your home address. Do not use a PO Box or rural route without a box number. If you live in a rural area but don’t have a street address or have no address, you can show where you live on a map later on the printed form."
      />
      {hasMailingAddress && (
        <AddressBlock
          addressType={"mailing"}
          parentRef={parentRef}
          title="MAILING ADDRESS"
        />
      )}
      {hasChangeOfAddress && (
        <AddressBlock
          addressType={"previous"}
          parentRef={parentRef}
          title="PREVIOUS ADDRESS"
        />
      )}
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
        onClick={async (event) => {
          event.preventDefault();
          const { state, city, street, name_first, name_last, dob, zip } =
            parentRef.current;
          if (
            state.length === 0 ||
            city.length === 0 ||
            street.length === 0 ||
            name_first.length === 0 ||
            name_last.length === 0 ||
            dob.length === 0 ||
            zip.length === 0
          ) {
            setError("Please complete all of the required fields");
            return;
          }
          setIsLoading(true);
          const ymd = dob.split("-");
          const year = ymd[0];
          const month = ymd[1];
          const day = ymd[2];
          const formattedDob = `${month}/${day}/${year}`;
          const postBody = {
            state,
            city,
            street,
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
              setParentState("otherInfo");
            }
          } catch (e) {
            setIsLoading(false);
            setParentState("otherInfo");
          }
          // setParentState("otherInfo");
        }}
      >
        NEXT
      </button>
      {showModal && (
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
                Looks like you've already registered to vote. Do you still want
                to continue?
              </p>
              <p className="voter-reg-modal-text">
                If you keep going, you are registering again with your state.
                Keep going if you’ve changed your party affiliation.
              </p>
              <button
                className="voter-reg-modal-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setParentState("otherInfo");
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
      )}
    </>
  );
};
