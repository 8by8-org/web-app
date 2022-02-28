import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { getFirestore, getDoc, doc} from 'firebase/firestore'
import SignUp1 from "../assets/images/PlayerWelcome/SignUp1.png"
import SignUp2 from "../assets/images/PlayerWelcome/SignUp2.png"
import Vote from "../assets/images/PlayerWelcome/Vote1.png"
import BlackCurve from '../assets/images/PlayerWelcome/BlackCurve.svg'
import './PlayerWelcome.scss'
import { auth } from "../firebase";
import { dummyPassword } from "../constants";
import { useAuth } from "../contexts/AuthContext";

export default function PlayerWelcome() {
    const history = useHistory(); 
    const { currentUser } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const [ challengerInfo, setChallengerInfo ] = useState(null);

    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    async function getChallengerInfo() {
        const db = getFirestore();
        const docRef = doc(db, "users", code)
        
        //only log in with substitute user if not already authenticated
        if(currentUser) {
            const query = await getDoc(docRef)
            localStorage.setItem('challengerInfo', JSON.stringify(query.data()))
        } else {
            await auth.signInWithEmailAndPassword(
                auth.getAuth(),
                'wkvxgesiknosbamhei@kvhrr.com',
                dummyPassword
            );
            const query = await getDoc(docRef)
            localStorage.setItem('challengerInfo', JSON.stringify(query.data()))
            auth.getAuth().signOut()
        }
    }
    
    useEffect(() => {
        //only queries challenger from firebase if not already in localstorage
        if(localStorage.getItem("challengerInfo")) {
            setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")))
        } else {
            getChallengerInfo()
            setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")))
        }

        challengerInfo && setLoading(false)
      });

    
    return (
        loading === false ? 
        <div className="player-welcome">
            <div className="top">
                <h1 className="top-heading">
                    <u className="underline">Support</u> {challengerInfo ? `${challengerInfo.name}'s`: 'the'} 8by8 Challenge!
                </h1>
                <div className="text">
                        <p>
                            <b>
                                Help {challengerInfo ? challengerInfo.name: 'your friend'} win their <u>8BY8 Challenge</u> by registering to vote or taking other actions to #stopasianhate!
                            </b>
                        </p>
                </div>
                <Button onClick={() => {history.push(`/actions`)}}>Get Started</Button>
                <div align="center">
                    <p className="small-text">Already have an account? <a href="/signin">Sign In</a></p>
                </div>
            </div>
            <img src={BlackCurve} className="curve"/> 
            <div className="main-content">
                <div>
                    <h3 className="heading"><u className="underline">Here's how it works</u></h3>
                </div>
                <p className="subheading">
                    1. ALL WE NEED IS YOUR ACTION
                </p>
                <p className="text">
                    You can take any number of the available actions: register to vote, get election reminders, 
                    or take the 8by8 challenge yourself. Pick one to start.
                </p>
                <div className="image">
                        <img src={SignUp1} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    2. YOUR FRIEND WILL EARN A BADGE
                </p>
                <p className="text">
                    Any of the 3 actions will help your friend earn a badge, and get closer to winning the challenge.
                </p>
                <div className="image">
                        <img src={SignUp2} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    3. COME BACK AND TAKE MORE ACTIONS
                </p>
                <p className="text">
                    Whether it is to help the same friend or a different one, the more action you take, the better! 
                    Note that you can only help earn on badge per friend.     
                </p>
                <div className="image">
                        <img src={Vote} alt="8by8 Logo" />
                </div>
                <Button onClick={() => {history.push(`/actions`)}}>Get Started</Button>
                <p align="center" className="small-text">Already have an account? <a href="/signin">Sign In</a></p>
            </div>
            </div>
            : <h1>loading</h1>
    ) 
}