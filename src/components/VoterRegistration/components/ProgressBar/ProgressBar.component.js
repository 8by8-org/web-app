import React from "react";

export const ProgressBar = ({ page }) => {
  let percentage;
  switch (page) {
    case "eligibility":
      percentage = 25;
      break;
    case "yourName":
      percentage = 50;
      break;
    case "homeAddress":
      percentage = 75;
      break;
    case "otherInfo":
      percentage = 100;
      break;
    case "formCompleted":
      percentage = 100;
      break;
    default:
      percentage = 25;
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg width="340" height="50">
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
            <stop offset="8.75%" stopColor="transparent" />
            <stop offset="8.75%" stopColor="lightgrey" />
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
          <rect x="20" y="22.5" height="5" width="300" />
          <circle cx="20" cy="25" r="10" />
          <circle cx="120" cy="25" r="10" />
          <circle cx="220" cy="25" r="10" />
          <circle cx="320" cy="25" r="10" />
        </g>
        <g
          fill={`url(#transparent-grey-gradient-${percentage}%)`}
          style={{ transition: "fill 500s ease-in" }}
        >
          <rect x="20" y="22.5" height="5" width="300" />
          <circle cx="20" cy="25" r="10" />
          <circle cx="120" cy="25" r="10" />
          <circle cx="220" cy="25" r="10" />
          <circle cx="320" cy="25" r="10" />
        </g>
      </svg>
    </div>
  );
};
