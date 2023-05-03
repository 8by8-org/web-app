import React from "react";
import "./Why8by8.scss";
import TealCurve from "../../../assets/images/HomePage/Curve2.svg";
import TealBottom from "../../../assets/images/Why8by8/tealBottom.png";
import VoteBubble from "../../../assets/images/Why8by8/voteBubble.png";
import Arnab from "../../../assets/images/Why8by8/arnab.png";
import Luis from "../../../assets/images/Why8by8/luis.png";
import Yudy from "../../../assets/images/Why8by8/yudy.png";
import Agustina from "../../../assets/images/Why8by8/agustina.png";
import BlurDivider from "../../../assets/images/Why8by8/blurDivider.png";
import PieChart from "../../../assets/images/Why8by8/pieChart.png";
import BlurBlob from "../../../assets/images/Why8by8/blurBlob.png";
import TealTop from "../../../assets/images/Why8by8/tealTop.png";
import TealWave from "../../../assets/images/Why8by8/tealWave.png";

export default function Why8by8() {
  return (
    <div style={{ overflow: "hidden", maxWidth: "100vw" }} className="why8by8">
      <div className="whyHero">
        <div className="padding">
          <h1 className="underline">Why 8by8</h1>
          <q>
            AAPI hate crimes have shot through the roof during the pandemic, yet
            there's limited media coverage. 8by8 gives me the opportunity to use
            my skills to advance political and social equality for the AAPI
            community and help increase voter turnout. The AAPI community
            deserves a future where we're treated the same and our culture is
            respected.
          </q>
          <aside>
            <span>—Arnab, High School Student</span>
            <img src={Arnab} alt="Arnab"></img>
          </aside>
        </div>

        <div className="custom-shape-divider-top-1659139317">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <div className="tealStats">
        <h1 className="bold-shadow">20%</h1>
        <h3>
          of Asian Americans and Pacific Islanders have experienced a hate
          incident in 2021.
        </h3>
      </div>
      <div className="whiteMidsection">
        <img src={TealCurve} className="tealCurve" alt="Teal Curve"></img>
        <q>
          It is was heart-breaking to know that the AAPI community, including my
          Indonesian friends, is still subjected to racism and discrimination. I
          was greatly encouraged to join 8by8 to contribute to the AAPI
          community and call out issues with the government and our society. I
          hope to do this not only in the US, but also everywhere across the
          world!
        </q>
        <aside>
          <span>—Agustina, College Student</span>
          <img src={Agustina} alt="Agustina"></img>
        </aside>
        <img src={BlurDivider} className="blur-divider alt" alt="Blur Divider"></img>
        <h1> Types of Hate Crimes Against AAPI</h1>
        <div className="chart">
          <img src={PieChart} alt="Pie Chart"/>
        </div>
        <h3>
          <b>11% of these are considered civil rights violations</b>, where the
          AAPI community members were barred from transportation, faced
          discrimination from housing or in the workplace, etc.
          <img src={BlurBlob} alt="Blur Blob" />
        </h3>
        <div className="lastStat">
          <h3>
            AAPI Hate Incidents reported by <br />
            <u>women</u> make up
            <br />
            <span className="bold-shadow"> 62% </span>
            <br />
            Of All Reports
          </h3>
          <img src={BlurBlob} className="blurBlob" alt="Blur Blob"/>
        </div>
      </div>
      <div className="finalTealStats">
        <img className="top-curve" src={TealTop} alt="Teal Top"/>
        <h2>Asians Have Historically Low Election Turnout</h2>
        <h1 className="bold-shadow">Below 60%</h1>
        <div className="stat">
          <h3>
            {" "}
            Asian-Americans Make Up
            <br />
            <span className="bold-shadow">7%</span>
            <br />
            Of the Population
          </h3>
        </div>
        <div className="stat">
          <h3>
            {" "}
            But Only
            <br />
            <span className="bold-shadow">3%</span>
            <br />
            Of Congress is Asian or AAPI
          </h3>
        </div>
        <img
          src={TealWave}
          className="leftSpread"
          style={{ transform: "translateY(00%)" }}
          alt="Teal Wave"
        />
      </div>
      <div className="closingQuotes">
        <q>
          The protagonists of my favorite Asian anime shows (DBZ, My Hero
          Academia, and Naruto) have taught me to always help those in danger.
          After hearing about the hate crimes from the news and from my AAPI
          peers, I wanted to help but didn't know how. Luckily I found 8by8, and
          I resonated with their goal to protect AAPI rights through voter
          registration.
        </q>
        <aside>
          <span>—Luis, College Student</span>
          <img className="img1" src={Luis} alt="Luis"></img>
        </aside>
        <div className="quote-gap"></div>
        <q>
          I joined the 8by8 partnerships team hoping to leverage my network and
          make a difference to the future of AAPI in America. Voter registration
          is a great starting point. My dream is to build a chain of modern and
          inclusive community centers for Asian Americans. With more civic
          engagement and political presence, the journey for modern Asian
          Community Centers can be easier and smoother!
        </q>
        <aside>
          <span className="quote-gap-2">—Yudy, Partnership Lead at 8BY8</span>
          <img src={Yudy} alt="Yudy"></img>
        </aside>

        <div className="chefusQuote">
          <img src={TealBottom} className="leftSpread tealBottom" alt="Teal Bottom"/>
          <q>
            Folks at 8by8 are professional and dedicated to fight for Asian
            rights. Thank you so much for your hard work and keep thriving!
          </q>
          <aside>
            <span>—Xintao She, Chefus CEO</span>
            <img className="logo" alt="Chefus Logo"/>
          </aside>
          <img
            src={TealTop}
            style={{
              position: "absolute",
              transform: "rotateX(180deg)",
              width: "100%",
              left: "0",
              zIndex: "9",
            }}
            alt="Teal Top"
          />
        </div>
      </div>
      <div className="pseudoFooter">
        <h4>Did you know?</h4>
        <h3>
          A swing of just
          <span className="bold-shadow">
            21,459 <br /> Votes
          </span>
          Would have <u>reversed</u> the outcome <br /> of the 2020 Presidential
          <br />
          election.
        </h3>
        <h4 style={{ padding: "2em 0" }}>
          That's a very small portion of AAPI voters who already make up 4% of
          the overall electorate! Your vote really counts!
        </h4>
        <img src={VoteBubble} alt="Vote Bubble"/>
      </div>
      <div className="linksBox">
        <a href="https://www.instagram.com/8by8vote/" target={"blank"}>
          Follow 8by8 Instagram to learn more
        </a>
        <br />
        <br />
        <span>
          Source: &nbsp;
          <a href="https://stopaapihate.org/national-report-through-september-2021/">
            Stop AAPI Hate Report (2020-2021)
          </a>
        </span>
      </div>
    </div>
  );
}
