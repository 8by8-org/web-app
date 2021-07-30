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
            <p>Challenge page</p>
            {<button onClick={togglePopup}>Invite friends</button>}
            <ChallengePagePopup show={popupVisible} togglePopup={togglePopup}/>
            <button onClick={() => history.push('/logout')}>Logout</button>
        </div>
    )
}
