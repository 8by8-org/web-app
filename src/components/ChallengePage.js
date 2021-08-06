import React, {useState} from 'react'
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
    return (
        <Container className="container-fluid py-3 px-5">
            <div>
                <p className="primary">Your Challenge Badges</p>
                <p className="secondary">Thanks for taking on the 8by8 Challenge! You will earn a badge for each friend who responds to your invite. Earn 8 to win! See restaurant rewards</p>
                <p className="tertiary" style={{ fontSize: '0.6rem' }}>Badges for {currentUser.email}:</p>
            </div>
            <div className="mb-4">
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
            <hr className="divider" style={{height: '3px', color: '#d2513d', opacity: '1'}}/>    
            <div className="py-3">            
                <Row>
                    <Col>                
                        <p className="secondary" style={{color: 'white', fontSize: '12px'}}>Send invitations to 8 AAPI friends to earn your badges!</p>
                    </Col>
                </Row>
                <Row>
                    <Col>                    
                        <Button onClick={togglePopup} className="py-2" id="button-style">Invite friends</Button>
                    </Col>
                </Row>
            </div>            
            <ChallengePagePopup show={popupVisible} togglePopup={togglePopup}/> 
        </Container>
    )
}
