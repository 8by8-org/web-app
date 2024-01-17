import React, { useEffect, useState } from "react";
import "./Notification.scss";

type NotifProps = {text:string, enable:boolean}

function Notification(props: NotifProps) {
  const [show, setShow] = useState("none");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    showNotification();
    setLoaded(true); // prevents showing notif on component mounting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.enable]);

  function delay(ms: number) {
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