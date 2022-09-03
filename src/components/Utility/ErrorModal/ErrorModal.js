import React from "react";
import "./error-modal.scss";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";

export const ErrorModal = ({ setShowSelf }) => {
    return (
        <div className="error-modal-outer-container">
        <div className="error-modal-inner-container">
          <IconContext.Provider value={{ color: "black" }}>
            <div className="error-modal">
              <div className="error-modal-toggle-btn-container">
                <button
                  className="error-modal-toggle-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSelf(false);
                  }}
                >
                  <MdIcons.MdClose size={"1x"} />
                </button>
              </div>
              <strong className="error-modal-heading">Something went wrong.</strong>
              <p className="error-modal-text">
                Please try again later!
              </p>
              <button
                className="error-modal-ok-btn"
                onClick={() => {
                  setShowSelf(false);
                }}
              >
                OK
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    )
}