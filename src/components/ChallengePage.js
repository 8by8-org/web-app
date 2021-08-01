import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChallengePagePopup from './ChallengePagePopup';
import ChallengeIcon from "./ChallengeIcon";
import { Button, Col, Container, Row } from 'react-bootstrap';
import './ChallengePage.css'

export default function ChallengePage() {
    const { currentUser } = useAuth();
    const [popupVisible, togglePopupVisible] = useState(false);
    const togglePopup = () => {
        togglePopupVisible(!popupVisible);
    }
    const history = useHistory();
    return (
        <Container className="p-5">
            <div className="">
                <p className="primary">Your Challenge Badges</p>
                <p className="secondary">Earn a badge for every friend who responds to your invite. Earn 8 to win!</p>
                <p className="tertiary">Badges for {currentUser.email}</p>
            </div>
                <div className="">
                    <Row>
                         <Col className="p-2">
                            <ChallengeIcon day="1" completed/>
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="2" />
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="3" />
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="4" />
                        </Col>
                    </Row>
                    <Row>
                    <Col className="p-2">
                            <ChallengeIcon day="5" />
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="6" />
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="7" />
                        </Col>
                        <Col className="p-2">
                            <ChallengeIcon day="8" />
                        </Col>                    
                    </Row>
                </div>
                <div>
                     <p>Invite 8 AAPI friends now to earn your badges!</p>
                     <Button onClick={togglePopup} className="px-5 btn-primary" id="button-style">Invite friends</Button>
                </div>
                    
                <ChallengePagePopup show={popupVisible} togglePopup={togglePopup}/>
                        {/* <Button onClick={() => history.push('/logout')}>Logout</Button> */}
        </Container>
    )
}
