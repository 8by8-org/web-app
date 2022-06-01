import React, { useEffect, useState } from "react";
import "./Notification.scss";

function Notification(props) {
  const [loadWidth, setLoadWidth] = useState("none");
  const [show, setShow] = useState("none");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    showNotification();
    setLoaded(true); // prevents showing notif on component mounting
  }, [props.enable]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showNotification() {
    if (show === "none" && loadWidth === "none" && loaded) {
      setShow("show");
      setLoadWidth("full");
      await delay(2000);
      setShow("none");
      await delay(350);
      setLoadWidth("none");
    }
  }

  return (
    <div className="notif-background">
      <div className={"Notification " + show}>
        <div className="text">{props.text ? props.text : "Notification"}</div>
        <div className={"load " + loadWidth}></div>
      </div>
    </div>
  );
}

export default Notification;
