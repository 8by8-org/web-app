import React from "react";
import { useHistory } from "react-router-dom";
import HomePageInfo from "./HomePageInfo";
import "react-bootstrap";
import logo from "../assets/images/white_logo.png"
// import "./HomePageInfo.scss";
import "./HomePage.scss";
import Background from "../assets/images/MaskGroup.png";
import {Link} from 'react-scroll'

export default function HomePage() {
    const homePageDivStyle = {
        padding: "30px 40px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: `url(${Background})`
      };

    const history = useHistory();
    return (
      <div>
          <div style={homePageDivStyle}>
            <img class="center padded" src={logo} alt="logo"></img>
              <h1 class="bebas-neue padded white-text">GET <u class="underline">8 FRIENDS</u> <br></br>
                TO REGISTER <br></br>
                TO VOTE IN <u class="underline">8 DAYS</u></h1>
              <div class="padded">
                <button class="yellow-button" onClick={() => history.push("/challengerwelcome")}><b class="lato">Take the Challenge</b></button>
                <button class="bordered-button"><Link to="info" smooth={true}><b class="lato">See More</b></Link></button>
              </div>
        </div>
        <div id="info">
          <HomePageInfo/>
        </div>
      </div>
    );
  }
