import { React } from 'react'
import { Button } from "react-bootstrap";
import { Accordion, Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router';
import {ReactComponent as VoteLogo} from '../assets/images/VoterReg/votefingers.svg'
import './VoterRegistration.scss'

export default function VoterRegistration() {
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleClick = () => {
        currentUser ? (
            window.open('https://register.rockthevote.com/registrants/new?partner=39079', '_blank')
        ) : (
            history.push('/signup')
        )
    }

    return (
        <div className="voter-registration">
            <div className="main-content">
                <h1 align="center" className="heading"><u className="underline">Register To Vote</u></h1>
                <VoteLogo align="center" className="image"/>
                <p align="center" className="text">8by8 is partnering with Rock The Vote to help you register in just a couple minutes!</p>
                <Accordion className="accordion" align='center'>
                    <Card className="accordion-card">
                        <Accordion.Toggle className="accordion-header" as={Card.Header} eventKey="0">
                        What is Rock the Vote?
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card className="accordion-card">
                        <Accordion.Toggle className="accordion-header" as={Card.Header} eventKey="1">
                        Am I eligible?
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="1">
                            <Card.Body>body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <div>
                    <Button className="button-style" onClick={handleClick}>Continue to Rock the Vote</Button>
                </div>

                <p align="center" className="small-text">Not eligible? <a href="/actions">Other actions to help</a></p>
            </div>
        </div>
    )
}
