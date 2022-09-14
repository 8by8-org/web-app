import React, { useState } from "react";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import "./Tooltip.scss";

export const Tooltip = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <button
        className="tooltipBtn"
        onClick={(e) => {
          e.preventDefault();
          setShowTooltip(!showTooltip);
        }}
      >
        <span className="tooltipQuestionMark">?</span>
      </button>
      {showTooltip && (
        <div className="tooltip-modal-outer-container">
          <div className="tooltip-modal-inner-container">
            <IconContext.Provider value={{ color: "black" }}>
              <div className="tooltip-modal">
                <div className="tooltip-toggle-container">
                  <button
                    className="tooltip-modal-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTooltip(false);
                    }}
                  >
                    <MdIcons.MdClose size={"1x"} />
                  </button>
                </div>
                <div className="tooltip-inner-container">
                  <p
                    style={{
                      marginLeft: "4px",
                      marginRight: "4px",
                      textAlign: "center",
                    }}
                  >
                    {text}
                  </p>
                  <button
                    className="tooltip-modal-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTooltip(false);
                    }}
                  >
                    OK, GOT IT
                  </button>
                </div>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      )}
    </>
  );
};
