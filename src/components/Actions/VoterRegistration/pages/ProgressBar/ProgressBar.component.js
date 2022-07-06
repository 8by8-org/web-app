import React from "react";

export const ProgressBar = ({ progressPercent }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <svg width="242.5" height="25">
        <defs>
          <linearGradient
            id="greenish-yellow-gradient"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#02ddc3" />
            <stop offset="100%" stopColor="#ffed10" />
          </linearGradient>
          <linearGradient
            id="transparent-grey-gradient-25%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="12%" stopColor="transparent" />
            <stop offset="12%" stopColor="lightgrey" />
          </linearGradient>
          <linearGradient
            id="transparent-grey-gradient-50%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="38.25%" stopColor="transparent" />
            <stop offset="38.25%" stopColor="lightgrey" />
          </linearGradient>
          <linearGradient
            id="transparent-grey-gradient-75%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="68%" stopColor="transparent" />
            <stop offset="68%" stopColor="lightgrey" />
          </linearGradient>
          <linearGradient
            id="transparent-grey-gradient-100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="100%" stopColor="transparent" />
            <stop offset="100%" stopColor="lightgrey" />
          </linearGradient>
        </defs>
        <g fill="url(#greenish-yellow-gradient)">
          <rect x="20" y="10.5" height="4" width="195" />
          <circle cx="20" cy="12.5" r="7.5" />
          <circle cx="85" cy="12.5" r="7.5" />
          <circle cx="150" cy="12.5" r="7.5" />
          <circle cx="215" cy="12.5" r="7.5" />
        </g>
        <g
          fill={`url(#transparent-grey-gradient-${progressPercent}%)`}
          style={{ transition: "fill 500s ease-in" }}
        >
          <rect x="20" y="10.5" height="4" width="195" />
          <circle cx="20" cy="12.5" r="7.5" />
          <circle cx="85" cy="12.5" r="7.5" />
          <circle cx="150" cy="12.5" r="7.5" />
          <circle cx="215" cy="12.5" r="7.5" />
        </g>
      </svg>
    </div>
  );
};
