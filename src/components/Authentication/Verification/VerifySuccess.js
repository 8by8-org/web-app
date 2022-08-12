import React, { useEffect } from "react";
import { useAuth } from "./../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import HighFive from "./../../../assets/4-pages/VerifySuccess/HighFive.png";
import Loading from "./../../../assets/4-pages/VerifySuccess/Loading.gif";
import "./VerifySuccess.scss";

function VerifySuccess() {
  const { currentUser, currentUserData } = useAuth();
  const history = useHistory();
  const playerStatus = localStorage.getItem("player");

  useEffect(() => {
    sendToPage();
  }, []);

  async function sendToPage() {
    await delay(3000);
    if (playerStatus) {
      history.push(`/${playerStatus}`);
    } else if (currentUserData && !currentUserData.startedChallenge) {
      history.push("/actions");
    } else {
      history.push("/progress");
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="verifysuccess">
      <img src={HighFive} alt="High Five" />
      <h1 className="underline">Welcome</h1>
      <h1>To 8by8</h1>
      <img className="loading" src={Loading} height={35} alt="Loading" />
    </div>
  );
}

export default VerifySuccess;
