import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import feedback from "./../../assets/4-pages/Header/Feedback.svg";
import logo from "./../../assets/logos/white-logo.svg";
import "./Header.scss";
import Sidebar from "./Sidebar";

function Header() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="navbar" id="navbar">
          <div className="navbar-buttons">
            <Navbar.Brand href="/">
              <img src={logo} alt="8by8 logo" id="brand-logo" />
            </Navbar.Brand>
            <div id="icons-tray">
              <a
                href="https://forms.gle/r33L2NAKT69MrvsZ7"
                target="_blank"
                id="feedback-icon"
              >
                <img src={feedback} />
              </a>

              <Nav.Link to="#" id="sidebar-icon">
                <FaIcons.FaBars onClick={showSidebar} />
              </Nav.Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={sidebar ? "nav-container active" : "nav-container"}>
          <nav className="nav-menu">
            <ul className="menu-items">
              <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Header;
