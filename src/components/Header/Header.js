import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "./../../contexts/AuthContext";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import logo from "./../../assets/logos/white-logo.svg";
import sidebarLogo from "./../../assets/logos/white-logo.svg";
import "./Header.scss";

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
  const greeting = "Hi There!";

  const actionLink = () => {
    if(localStorage.getItem("challengerInfo")) {
        return "/actions"
    }
    return "/signin"
  }

  // all sidebar links lead to path: /
  const SidebarData = [
    {
      title: "Take the Challenge",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
    },
    {
      title: "Take Action",
      path: actionLink(),
      icon: <GiIcons.GiJeweledChalice />,
    },
    {
      title: "Notifications",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
    },
    {
      title: "Share",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
    },
    {
      title: "Why 8by8?",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
    },
    {
      title: "FAQS",
      path: "/",
      icon: <GiIcons.GiJeweledChalice />,
    },
  ];

  // static notification data for testing
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

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="navbar" id="navbar">
          <div className="navbar-buttons">
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
        </div>

        {/* Sidebar */}
        <div className={sidebar ? "nav-container active" : "nav-container"}>
          <nav className="nav-menu">
            <ul className="menu-items" onClick={showSidebar}>
              <li className="menu-header">
                <Nav.Link to="#">
                  <IoIcons.IoIosArrowForward />
                </Nav.Link>
                <img src={sidebarLogo} alt="8by8 logo" />
              </li>
              <p className="menu-greeting">{greeting}</p>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className="nav-text">
                    <Nav.Link href={item.path}>
                      {item.icon}
                      <p>{item.title}</p>
                    </Nav.Link>
                  </li>
                );
              })}
              <div className="menu-settings">
                <Nav.Link href="/">Settings</Nav.Link>
                <Nav.Link href="/">Privacy Policy</Nav.Link>
                {currentUser ? (
                  <Nav.Link href="/signout">Sign out</Nav.Link>
                ) : (
                  <Nav.Link href="/signin">Sign In</Nav.Link>
                )}
              </div>
            </ul>
          </nav>
        </div>

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
