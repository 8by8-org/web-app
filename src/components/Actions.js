import React, { useState } from 'react';
import { useHistory, useParams, matchPath } from 'react-router';
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Avatar from "../assets/avatars/Girl-2.png";
import './Actions.scss';

export default function Actions(props) {
    const actionDivStyle = {
        padding: "0px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    };

    const { id: challengerId } = useParams(); // from url parameter
    const [challengerName, setChallengerName] = useState(null);
    const { currentUser: { uid: playerId } } = useAuth();
    
    // fetches name from database with challengerId
    db.collection("users").doc(challengerId)
        .get()
        .then((doc) => {
            const name = doc.data().name
            if(name){
                setChallengerName(name)
            }
        });

    const history = useHistory();

    // creates challenge data structure
    const startChallenge = () => {
        const now = new Date;
        const challengeEndStamp = new Date(now.setDate(now.getDate() + 8));
        db.collection("users").doc(challengerId).collection("challenge").doc("challenge")
            .set({
                badges: [],
                challengeEnd: challengeEndStamp
            });

        history.push('/challengerwelcome')
    };

    

    return (
        <div>
            <div style={actionDivStyle} className="action-page">
                <h1 className="bebas-neue take-action">TAKE ACTION</h1>
                <p className="lato sub-title">Thanks for registering to vote! Henry will get one badge
                    because of your action. Well done!
                </p>

                {/* avatar */}
                <img className="actions avatar-image" src={Avatar} alt="Avatar" />

                <p className="lato tiny-text">You're taking action for:</p>

                {/* player name */}
                <h2 className="lato challenge-name">{challengerName ? challengerName : "Player"}'s Challenge</h2>


                {/* yellow buttons */}
                <div className="d-flex justify-content-center buttons-container">
                    <button className="avatar-button">
                        <p className="lato avatar-button-text">Send Emoji</p>
                    </button>
                    <button className="avatar-button">
                        <p className="lato avatar-button-text">Share</p>
                    </button>
                </div>
                <p className="lato cta-pre-text">You can still help the AAPI community by
                    taking another action!</p>

                {/* action buttons */}
                <div className="action-buttons-container">
                    <button className="gray-button">
                        <p className="lato gray-button-text">Get election reminders</p>
                    </button>
                    <button className="gray-button" onClick={startChallenge}>
                        <p className="lato gray-button-text">Take the challenge yourself</p>
                    </button>
                    <button className="gray-button" onClick={() => history.push('/progress')}>
                        <p className="lato gray-button-text">See your challenge</p>
                    </button>
                </div>

                <p className="lato tiny-text user-question">Looking for something else?</p>
                <p className="lato tiny-text link-text restart">
                    <a className="lato" href="http://www.google.com">Restart voter registration</a>
                </p>
            </div>
        </div>
    );
};
