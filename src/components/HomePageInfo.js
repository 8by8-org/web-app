import React from "react";
import HomePageImage from "../assets/images/homepage.png";
import "react-bootstrap";
import "./HomePageInfo.scss"

export default function HomePageInfo() {
    return <div>
        <div class="white-background">
            <h2 className="bebas-neue black-text">WHY 8BY8?</h2>
            <p className="lato black-text">In 2020, we saw an unprecedented <b>150%</b> spike in anti-Asian and anti-AAPI hate crimes, a trend that is already continuing into 2021. This is both a national and a local problem - in the Bay Area alone, there were over <b>700</b> such hate crimes during the pandemic - a rate of over <b>2 per day</b>. 
            <br></br><br></br>
                We believe that the path to fixing this problem <b>starts with closing the representation gap in Asian-American communities</b>; Asian American turnout rate has historically remained <b>below 50%</b>, and while Asian-Americans make up 6% of the population, only <b>3%</b> of Congress is Asian or AAPI.</p>
            <img src={HomePageImage} alt="rally"></img>
        </div>

        <div class="white-background">
            <h2 className="bebas-neue black-text">OUR SOLUTION</h2>
            <p className="lato black-text">We know that closing the voter registration gap has to be a <b>community effort</b>, so we're asking everyone to join us in taking the #8by8 challenge and <b>registering 8 of their friends, family, or coworkers to vote in 8 days</b>. 
            <br></br><br></br>
                Our goal is to <b>build civic participation and bring awareness to the struggles of Asian American and AAPI citizens, while encouraging community involvement and investment</b>. Towards this end, we're working with community, business, and tech leaders to create voter registration solutions that work.</p>
        </div>
    </div>
}