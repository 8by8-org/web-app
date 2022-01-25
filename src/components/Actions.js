import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import Avatar from "../assets/avatars/Girl-2.png";
import "./Actions.scss";

export default function Actions() {
    const actionDivStyle = {
        padding: "0px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    };

    const { id: challengerId } = useParams(); 
    const [challengerName, setChallengerName] = useState(null);

    useEffect(() => {
        if (challengerId) {  
           
            //  get challenger info from localstorage

        };
    }, [challengerId]);

    const history = useHistory();

    // creates challenge data structure
    const startChallenge = () => {
        const now = new Date();
        const challengeEndStamp = new Date(now.setDate(now.getDate() + 8));
        setDoc(doc(db, "users", challengerId, "challenge", "challenge"), {
            badges: [],
            challengeEnd: challengeEndStamp,
        });
        history.push("/challengerwelcome");
    };

    const handleVoterReg = () => {
        localStorage.setItem('player', 'voter');
        history.push('/voterreg');
    };

    const handleElectionReminder = () => {
        localStorage.setItem('player', 'reminder');
    };

    return (
        <div>
            <div style={actionDivStyle} className="action-page">
                <h1 className="bebas-neue take-action">TAKE ACTION</h1>
                <p className="lato sub-title">
                    Thanks for registering to vote! {challengerName ? challengerName : "The challenger"} will get one badge because of
                    your action. Well done!
                </p>

                {/* avatar */}
                <img className="actions avatar-image" src={Avatar} alt="Avatar" />

                <p className="lato tiny-text">You're taking action for:</p>

                {/* challenger's name or*/}
                <h2 className="lato challenge-name">
                    {challengerName ? challengerName : "Player"}'s Challenge 
                </h2>

                {/* yellow buttons */}
                <div className="d-flex justify-content-center buttons-container">
                    <button className="avatar-button">
                        <p className="lato avatar-button-text">Send Emoji</p>
                    </button>
                    <button className="avatar-button">
                        <p className="lato avatar-button-text">Share</p>
                    </button>
                </div>
                <p className="lato cta-pre-text">
                    You can still help the AAPI community by taking another action!
                </p>

                {/* action buttons */}
                <div className="action-buttons-container">
                    <button className="gray-button" onClick={handleElectionReminder}>
                        <p className="lato gray-button-text">Get election reminders</p>
                    </button>
                    <button className="gray-button" onClick={startChallenge}>
                        <p className="lato gray-button-text">Take the challenge yourself</p>
                    </button>
                </div>

                <p className="lato tiny-text user-question">
                    Looking for something else?
                </p>
                <p className="lato tiny-text link-text restart">
                    <a className="lato" onClick={handleVoterReg}>
                        Restart voter registration
                    </a>
                </p>
            </div>
        </div>
    );
};
