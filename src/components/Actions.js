import React from 'react'
import { useHistory } from 'react-router'
import {ReactComponent as Avatar} from '../assets/avatars/Boy1.svg'
import WhiteCurve from '../assets/images/Actions/Union.svg'
import './Actions.scss'

export default function Actions() {
    const history = useHistory();
    return (
        <div className="main-content">
            <div className="top" align="center">
                <div className="action-status">
                    <h1 className="heading">Take Action For:</h1>
                </div>
                <div className="avatar-container">
                    <Avatar id="challenger-avatar"/> {/**Avatar will change based on challenger*/}
                    <p id="challenger-name">Name</p> {/**Get challenger name from url */}
                </div>
            </div>
            <img src={WhiteCurve} className="curve"/>
            <div className="action-items">
                <div className="py-2">
                    <button className="primary-button" onClick={() => {history.push('/voterreg'); localStorage.setItem('player', 'voter')}}>Register to vote</button>
                </div>
                <div className="py-2">
                    <button className="secondary-button" onClick={() => {history.push('/electionreminder'); localStorage.setItem('player', 'reminder')}}>Get election reminders</button>
                </div>
                <div className="py-2">
                    <button className="secondary-button" onClick={() => {history.push('/challengerwelcome')}}>Take the challenge</button>
                </div>
            </div>
        </div>
    )
}
