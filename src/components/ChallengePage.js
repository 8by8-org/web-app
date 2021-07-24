import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChallengePagePopup from './ChallengePagePopup';

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
            <p>I've changed this!</p>
            <p>Challenge page</p>
            {!popupVisible && <button onClick={togglePopup}>Invite friends</button>}
            {popupVisible && <ChallengePagePopup togglePopup={togglePopup}/>}
            <button onClick={() => history.push('/logout')}>Logout</button>
        </div>
    )
}
