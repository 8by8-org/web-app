import React from 'react'
import { useHistory } from 'react-router'
import { Button, Row } from 'react-bootstrap'

export default function PlayerWelcome() {
    const history = useHistory(); 
    return (
        <div>
            <Row>
                <h1>Welcome</h1>
            </Row>
            <Row>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
            </Row>
            <Row>
                <Button onClick={() => {history.push("/actions")}}>Let's Start</Button>
            </Row>
        </div>
    )
}
