import React from 'react'
import { Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export default function Actions() {
    return (
        <div>
            <Row>
                <h1>Take Action</h1>
            </Row>
            <Row>
                <p>Your actions matter towards better AAPI representation in our country.</p>
            </Row>
            <Row>
                <img href="link to icon" alt="icon" />
            </Row>
            <Row>
                <p>You're taking action for:</p>
                <p>(Get challenger info from url)</p>
            </Row>
            <Row className="py-2">
                <Button>Register to vote</Button>
            </Row>
            <Row className="py-2">
                <Button>Get election reminders</Button>
            </Row>
            <Row className="py-2">
                <Button>Take the challenge yourself</Button>
            </Row>
        </div>
    )
}
