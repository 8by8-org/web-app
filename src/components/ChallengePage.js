import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChallengePagePopup from './ChallengePagePopup';
import ChallengeIcon from "./ChallengeIcon";

export default function ChallengePage() {
    const { currentUser } = useAuth();
    const [popupVisible, togglePopupVisible] = useState(false);
    const togglePopup = () => {
        togglePopupVisible(!popupVisible);
    }
    const history = useHistory();
    return (
        <div>
            <p>current login status (debug purposes): {currentUser === null ? 'Logged out' : currentUser.email}</p>
            <p>Challenge page</p>
            <ChallengeIcon day='1' completed />
            <ChallengeIcon day='2' completed />
            <ChallengeIcon day='3' />
            <ChallengeIcon day='4' />
            <br/>
            <ChallengeIcon day='5' />
            <ChallengeIcon day='6' />
            <ChallengeIcon day='7' />
            <ChallengeIcon day='8' />
            <br/>
            {<button onClick={togglePopup}>Invite friends</button>}
            <ChallengePagePopup show={popupVisible} togglePopup={togglePopup}/>
            <button onClick={() => history.push('/logout')}>Logout</button>
        </div>
    )
}
