import React, { useState } from "react";
import { AddressBlock } from "./AddressBlock.component";
// import ZipCodeData from "zipcode-data";

export const HomeAddress = ({ parentRef, setParentState }) => {
  const [hasMailingAddress, setHasMailingAddress] = useState(false);
  const [hasChangeOfAddress, setHasChangeOfAddress] = useState(false);

  return (
    <>
      <AddressBlock
        addressType={"home"}
        parentRef={parentRef}
        title="HOME ADDRESS"
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
