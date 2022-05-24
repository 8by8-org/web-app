import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import SignUp1 from "../assets/images/PlayerWelcome/SignUp1.png"
import SignUp2 from "../assets/images/PlayerWelcome/SignUp2.png"
import Vote from "../assets/images/PlayerWelcome/Vote1.png"
import BlackCurve from '../assets/images/PlayerWelcome/BlackCurve.svg'
import './PlayerWelcome.scss'
import { auth } from "../firebase";
import { dummyPassword } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { LoadingWheel } from "./LoadingWheel/LoadingWheel.component";

export default function PlayerWelcome({ isShare }) {
    const history = useHistory();
    const { currentUser } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const [ challengerInfo, setChallengerInfo ] = useState(null);

    const url = window.location.href
    const code = url.split('/').pop();

    async function getChallengerInfo() {
        const db = getFirestore();
        // If isShare is false then use the uid of the current user, else use the code gotten from the url.
        const docRef = doc(db, "users", isShare === false ? currentUser.uid : code)

        //only log in with substitute user if not already authenticated
        //only challenger's name and avatar is stored for security
        if(currentUser) {
            const query = await getDoc(docRef)
            // Just in case query.data() does not return anything, then send the user to the signin page.
            if (query.data()) {
              const info = (({name, avatar}) => ({name, avatar}))(query.data())
              info.challengerID = code;
              isShare === undefined && localStorage.setItem('challengerInfo', JSON.stringify(info))
            } else {
              history.push(`/signin`)
            }
        } else {
            await auth.signInWithEmailAndPassword(
                auth.getAuth(),
                'wkvxgesiknosbamhei@kvhrr.com',
                dummyPassword
            );
            const query = await getDoc(docRef)
            const info = (({name, avatar}) => ({name, avatar}))(query.data())
            info.challengerID = code;
            localStorage.setItem('challengerInfo', JSON.stringify(info))
            auth.getAuth().signOut()
        }
        setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")))
    }

    // If code that is gotten from the url is playerwelcome or isShare is true then, if there is challengerInfo in
    // local storage then set it to challengerInfo, else send the user to the signin page. For eveything else run getChallengerInfo.
    useEffect(() => {
        code === "playerwelcome" || isShare
        ? localStorage.getItem("challengerInfo") ? setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo"))) : history.push(`/signin`)
        : getChallengerInfo()
    }, []);

    // Render page after challengerInfo is gotten.
    useEffect(() => {
        challengerInfo && setLoading(false);
    }, [challengerInfo])

    // If isShare is undefined, when playerwelcome page is rendered not in invite or share, then the buttons work.
    return (
        loading === false ? (
        <div className="player-welcome">
          <div className="top">
            <h1 className="top-heading">
              <u className="underline">Support</u> {challengerInfo && challengerInfo.name!==null ? `${challengerInfo.name}'s`: 'the'} 8by8 Challenge!
            </h1>

              <p className="text">
                <b>
                  Help {challengerInfo && challengerInfo.name!==null ? challengerInfo.name: 'your friend'} win their <u>8BY8 Challenge</u> by registering to vote or taking other actions to #stopasianhate!
                </b>
              </p>
            
            <Button className="getStarted-button" onClick={() => {isShare === undefined && history.push(`/actions`)}}>Get Started</Button>
            <div align="center">
              <p className="small-text">
                Already have an account? <button className="signin-link blue" onClick={() => {isShare === undefined && history.push(`/signin`)}}>Sign In</button>
              </p>
            </div>
          </div>
          <img src={BlackCurve} className="curve" alt="Black Curve"/>
          <div className="main-content">
            <div>
              <h3 className="heading"><u className="underline">Here's how it works</u></h3>
            </div>
            <p className="subheading">
              1. Choose an action to take
            </p>
            <p className="text">
              You can take any number of the available actions: register to vote, get election reminders or take the 8by8 challenge yourself. Pick one to start.
            </p>
            <div className="image">
              <img src={SignUp1} alt="8by8 Logo" />
            </div>
            <p className="subheading">
              2. Your friend will earn a badge
            </p>
            <p className="text">
              Any of the 3 actions will help your friend earn a badge and get closer to winning the challenge.
            </p>
            <div className="image">
              <img src={SignUp2} alt="8by8 Logo" />
            </div>
            <p className="subheading">
              3. Come back and take more actions
            </p>
            <p className="text">
              Whether it is to help the same friend or a different one, the more actions you take, the better!
              Note that you can only help earn one badge per friend.
            </p>
            <div className="image">
              <img src={Vote} alt="8by8 Logo" />
            </div>
            <Button className="getStarted-button" onClick={() => {isShare === undefined && history.push(`/actions`)}}>Get Started</Button>
            <p align="center" className="small-text">
              Already have an account? <button className="signin-link black" onClick={() => {isShare === undefined && history.push(`/signin`)}}>Sign In</button>
            </p>
          </div>
        </div>
        ) : (
        <LoadingWheel overlay={false}/>
        )
    )
}
