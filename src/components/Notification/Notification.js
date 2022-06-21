import React, { useEffect, useState } from "react";
import "./Notification.scss";

function Notification(props) {
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
    if (show === "none" && loaded) {
      setShow("show");
      await delay(1500); // how long notif shows
      setShow("none");
    }
  }

  return (
    <div className="notif-background">
      <div className={"Notification " + show}>
        <div className="text">{props.text ? props.text : "Notification"}</div>
      </div>
    </div>
  );
}

export default Notification;
