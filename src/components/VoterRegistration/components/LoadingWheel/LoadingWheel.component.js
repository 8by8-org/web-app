import React from "react";
import "./LoadingWheel.scss";

export const LoadingWheel = () => {
  return (
    <div className="loading-wheel-outer-container">
      <div className="loading-wheel-inner-container">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
