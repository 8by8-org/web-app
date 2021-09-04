import React from 'react'
import { Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export default function VoterRegistration() {
    return (
        <div>
            <h1>Register To Vote</h1>
            <p>What is Rock the Vote?</p>

            <Row>
                <Button>Continue to Rock the Vote</Button>
            </Row>
            
            <p>Not eligible? <a href="/actions">Other actions to help</a></p>
        </div>
    )
}
