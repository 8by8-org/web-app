import React from "react";
import "./LoadingWheel.scss";

//set overlay to true for a fixed position loading wheel that displays over the screen content
export const LoadingWheel = ({ overlay }) => {
  return (
    <div
      className={
        overlay
          ? "loading-wheel-outer-container"
          : "loading-wheel-outer-container-block"
      }
    >

      <div
        className={
          overlay
            ? "loading-wheel-inner-container"
            : "loading-wheel-inner-container-white"
        }
      >
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
