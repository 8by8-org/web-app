import React from "react";
import { useHistory } from "react-router-dom";
import HomePageInfo from "./HomePageInfo";
import "react-bootstrap";
import logo from "../assets/images/white_logo.png"
import "./LandingPageInfo.css";
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

      const textStyle = {
        color: "white",
        alignSelf: "flex-end",
        display: "block",
        margin: "0 auto",
        // fontSize: "48pt"
    };

    const underline = {
        textDecoration: "underline #FFED10"
    }

    const yellowButton = {
        padding: "9px",
        width: "100%",
        background: "#FFED10",
        border: "none",
        textAlign: "center", 
    }

    const borderedButton = {
      padding: "9px",
      width: "100%",
      background: "none",
      color: "white",
      border: " 3px solid #FFED10",
      textAlign: "center",
  }

    const history = useHistory();
    return (
      <div>
          <div style={homePageDivStyle}>
            <img class="center padded" src={logo}></img>
              <h1 style={textStyle} class="bebas-neue padded">GET <u style={underline}>8 FRIENDS</u> <br></br>
                TO RESISTER <br></br>
                TO VOTE IN <u style={underline}>8 DAYS</u></h1>
              <div class="padded">
                <button style={yellowButton} onClick={() => history.push("/challengerwelcome")}><b class="lato">Take the Challenge</b></button>
                <button style={borderedButton}><Link to="info" smooth={true}><b class="lato">See More</b></Link></button>
              </div>
        </div>
        <div id="info" style={{paddingTop: "15px"}}>
        <HomePageInfo/>
        </div>
      </div>
    );
  }