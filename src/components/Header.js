import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import logo from "../assets/logos/logo.svg";
import sidebarLogo from "../assets/logos/black-logo.svg";
import "./Header.scss";
import { db } from "../firebase";

function Header() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
    setNotif(false);
  };

  const [notif, setNotif] = useState(false);
  const showNotif = () => {
    setNotif(!notif);
    setSidebar(false);
  };

  const { currentUser } = useAuth();
  const greeting = `Hi ${currentUser.name ? currentUser.name : "There"}!`;

  // all sidebar links lead to path: /

  const SidebarData = {
    "Take the Challenge": {
      title: "Take the Challenge",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
    "My Challenge": {
      title: "My Challenge",
      path: `/progress/${currentUser?.uid}`,
      icon: <GiIcons.GiJeweledChalice />,
      show: false
    },
    "Take Action": {
      title: "Take Action",
      path: `/actions/${currentUser?.uid}`,
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
    "Notifications": {
      title: "Notifications",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
    "Share": {
      title: "Share",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
    "Why 8by8?": {
      title: "Why 8by8?",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
    "FAQS": {
      title: "FAQS",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
      show: true
    },
  };

  const NotifData = [
    {
      icon: <IoIcons.IoIosPerson />,
      text: "Olivia sent you a 🎊 for setting election reminders",
      date: "Just now",
      read: "false",
    },
    {
      icon: <IoIcons.IoIosPerson />,
      text: "Elliot took your challenge invite",
      date: "Just now",
      read: "false",
    },
    {
      icon: <IoIcons.IoIosPerson />,
      text: "Fin took your challenge invite",
      date: "Aug 9",
      read: "true",
    },
    {
      icon: <IoIcons.IoIosPerson />,
      text: "Fin sent you a 👏 for registering to vote",
      date: "Aug 9",
      read: "true",
    },
  ];

  const [sideBarDynamic, setSideBarDynamic] = useState(SidebarData);
  
  // sets challange started status for sideBar buttons
  useEffect(() => {
    if (currentUser?.uid){
      db.collection("users").doc(currentUser?.uid).collection("challenge").doc("challenge")
        .get()
        .then(doc => {
          if (doc.exists) {
            setSideBarDynamic({
              ...sideBarDynamic,
              "Take the Challenge": {
                ...sideBarDynamic["Take the Challenge"],
                "show": false
              },
              "My Challenge": {
                ...sideBarDynamic["My Challenge"],
                "challengeStarted": true,
              }
            })
          }
          else {
            setSideBarDynamic({
              ...sideBarDynamic,
              "Take the Challenge": {
                ...sideBarDynamic["Take the Challenge"],
                "show": false
              },
              "My Challenge": {
                ...sideBarDynamic["My Challenge"],
                "challengeStarted": false,
              }
            })
          }
        });
    }
  }, [currentUser?.uid])
  
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <div className="navbar">
          <Navbar.Brand href="/">
            <img src={logo} alt="8by8 logo" id="brand-logo" />
          </Navbar.Brand>
          <div id="icons-tray">
            <Nav.Link to="#" id="sidebar-icon">
              <MdIcons.MdNotificationsNone onClick={showNotif} />
            </Nav.Link>
            <Nav.Link to="#" id="notif-icon">
              <FaIcons.FaBars onClick={showSidebar} />
            </Nav.Link>
          </div>
        </div>

        {/* Sidebar */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="menu-items" onClick={showSidebar}>
            <li className="menu-header">
              <Nav.Link to="#">
                <IoIcons.IoIosArrowForward />
              </Nav.Link>
              <img src={sidebarLogo} alt="8by8 logo" />
            </li>
            <p className="menu-greeting">{greeting}</p>
            {Object.values(sideBarDynamic).map((item, index) => {
              if(item.show){
                return (
                  <li key={index} className="nav-text">
                    <Nav.Link href={item.path}>
                      {item.icon}
                      <p>{item.title}</p>
                    </Nav.Link>
                  </li>
                )
              };
            })}
            <div className="menu-settings">
              <Nav.Link href="/">Settings</Nav.Link>
              <Nav.Link href="/">Privacy Policy</Nav.Link>
              {currentUser ? (
                <Nav.Link href="/logout">Logout</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </div>
          </ul>
        </nav>

        {/* Notifications */}
        <div className="notif-wrapper">
          <nav className={notif ? "notif-menu active" : "notif-menu"}>
            <ul className="notif-items" onClick={showNotif}>
              <li className="notif-toggle">
                <Nav.Link to="#" id="close-icon">
                  <MdIcons.MdClose />
                </Nav.Link>
                <span className="notif-title">Notifications</span>
              </li>
              {NotifData.map((item, index) => {
                return (
                  <li key={index} className={"notif-container " + item.read}>
                    <span className="notif-icon">{item.icon}</span>
                    <span className="notif-text">{item.text}</span>
                    <span className="notif-date">{item.date}</span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Header;
