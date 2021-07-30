import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChallengePagePopup from './ChallengePagePopup';
import SVGIcon from "./IconComponent";

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
            <SVGIcon name="icon1uncompleted" width={100} />
            <SVGIcon name="icon2uncompleted" width={100} />
            <SVGIcon name="icon3uncompleted" width={100} />
            <SVGIcon name="icon4uncompleted" width={100} />
            <br/>
            <SVGIcon name="icon5uncompleted" width={100} />
            <SVGIcon name="icon6uncompleted" width={100} />
            <SVGIcon name="icon7uncompleted" width={100} />
            <SVGIcon name="icon8uncompleted" width={100} />
            <br/>
            {<button onClick={togglePopup}>Invite friends</button>}
            {popupVisible && <ChallengePagePopup togglePopup={togglePopup}/>}
            <button onClick={() => history.push('/logout')}>Logout</button>
        </div>
    )
}
