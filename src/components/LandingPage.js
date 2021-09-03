import React from "react";
import { useHistory } from "react-router-dom";
import LandingPageInfo from "./LandingPageInfo";

export default function LandingPage() {
  const history = useHistory();
  return (
    <div>
      <LandingPageInfo />
      <button onClick={() => history.push("/signup")}>Take the challenge</button>
    </div>
  );
}
