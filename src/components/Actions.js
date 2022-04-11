import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router'
import Avatar1 from '../assets/avatars/avatar1.svg'
import Avatar2 from '../assets/avatars/avatar2.svg'
import Avatar3 from '../assets/avatars/avatar3.svg'
import Avatar4 from '../assets/avatars/avatar4.svg'
import WhiteCurve from '../assets/images/Actions/Union.svg'
import './Actions.scss'

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4]

export default function Actions() {
    const history = useHistory();
    const [ loading, setLoading ] = useState(true);
    const [ challengerInfo, setChallengerInfo ] = useState(null);
    
    useEffect(() => {
        if(localStorage.getItem("challengerInfo")) {
            setChallengerInfo(JSON.parse(localStorage.getItem("challengerInfo")))
        } 
        setLoading(false)
      }, [loading]);

    return (
        loading === false?
        <>
        <div className="main-content">
            <div className="top">
                { challengerInfo ? (
                    <>
                        <div className="avatar-and-status">
                            <div className="action-status">
                                <h1>Take Action For:</h1>
                            </div>
                            <div className="avatar-container">
                                <img 
                                    src={challengerInfo.avatar ? avatars[(challengerInfo.avatar)-1] : avatars[0]} 
                                    id="challenger-avatar"
                                />
                                <p id="challenger-name">{challengerInfo.name}</p>
                            </div>
                        </div>
                    </>
                    ) : <h1 id="action-no-challenger" align="center">Take Action</h1>
                }
            </div>
            <img src={WhiteCurve} className="curve"/> 
            <div className="action-items">
                <div className="py-2">
                    <Button className="primary-button" onClick={() => {history.push(`/voterreg`); localStorage.setItem('player', 'voterreg')}}>Register to vote</Button>
                </div>
                <div className="py-2">
                    <Button className="secondary-button" onClick={() => {history.push(`/election-reminders`); localStorage.setItem('player', 'election-reminders')}}>Get election reminders</Button>
                </div>
                <div className="py-2">
                    <Button className="secondary-button" onClick={() => {history.push('/challengerwelcome'); localStorage.setItem('player', 'progress')}}>Take the challenge</Button>
                </div>
            </div>
        </div>
        </>: <h1>loading</h1>
    )
}