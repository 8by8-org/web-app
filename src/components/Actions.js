import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router'
import {ReactComponent as Avatar} from '../assets/avatars/Boy1.svg'
import WhiteCurve from '../assets/images/Actions/Union.svg'
import './Actions.scss'

export default function Actions() {
    const history = useHistory();
    const [ loading, setLoading ] = useState(true);
    const [ challengerInfo, setChallengerInfo ] = useState(null);
    
    useEffect(() => {
        setChallengerInfo(JSON.parse(localStorage.getItem('challengerInfo')))
        setLoading(false)
      }, [loading]);

    return (
        <div className="main-content">
            <div className="top">
                { challengerInfo ? (
                    <div>
                        <div className="avatar-and-status" align="center">
                            <div className="action-status">
                                <h1 className="heading">Take Action For:</h1>
                            </div>
                            <div className="avatar-container">
                                <Avatar id="challenger-avatar"/> {/**Avatar will change based on challenger*/}
                                <p id="challenger-name">Name</p> {/**Get challenger name from url */}
                            </div>
                        </div>
                        <img src={WhiteCurve} className="curve"/> 
                    </div>
                    ) : <h1 id="action-no-challenger" align="center">Take Action</h1>
                }
            </div>
            <div className="action-items">
                <div className="py-2">
                    <Button className="primary-button" onClick={() => {history.push('/voterreg'); localStorage.setItem('playerStatus', 'voter')}}>Register to vote</Button>
                </div>
                <div className="py-2">
                    <Button className="secondary-button" onClick={() => {history.push('/election-reminders'); localStorage.setItem('playerStatus', 'reminder')}}>Get election reminders</Button>
                </div>
                <div className="py-2">
                    <Button className="secondary-button" onClick={() => {history.push('/challengerwelcome')}}>Take the challenge</Button>
                </div>
            </div>
        </div>
    )
}
