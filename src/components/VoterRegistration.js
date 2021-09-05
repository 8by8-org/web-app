import React from 'react'
import { Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router';

export default function VoterRegistration() {
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleClick = () => {
        currentUser? (
            window.open(window.open('https://register.rockthevote.com/registrants/new?partner=39079', '_blank'))
        ) : (
            history.push('/login')
        )
    }

    return (
        <div>
            <h1>Register To Vote</h1>
            <p>What is Rock the Vote?</p>

            <Row>
                <Button onClick={handleClick}>Continue to Rock the Vote</Button>
            </Row>

            <p>Not eligible? <a href="/actions">Other actions to help</a></p>
        </div>
    )
}
