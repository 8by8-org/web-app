import React from 'react'
import { Row, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './Actions.css'

export default function Actions() {
    const history = useHistory();
    return (
        <div>
            <Container fluid className="py-4 px-5">
                <Row align="center">
                    <h1>Take Action</h1>
                </Row>
                <Row align="center">
                    <p>Your actions matter towards better AAPI representation in our country.</p>
                </Row>
                <Row>
                    <p>user icon</p>
                </Row>
                <Row>
                    <p>You're taking action for:</p>
                    <p>(Get challenger info from url)</p>
                </Row>
                <Row className="py-2">
                    <Button className="py-2" id="button-style" onClick={() => {history.push('/voterreg')}}>Register to vote</Button>
                </Row>
                <Row className="py-2">
                    <Button className="py-2" id="button-style" onClick={() => history.push('/reminders')}>Get election reminders</Button>
                </Row>
                <Row className="py-2">
                    <Button className="py-2" id="button-style" onClick={() => history.push('/challengewelcome')}>Take the challenge yourself</Button>
                </Row>
            </Container>
        </div>
    )
}
