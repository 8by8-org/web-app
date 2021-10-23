import { React } from 'react'
import { Row, Button, Container, Accordion, Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router';

export default function VoterRegistration() {
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleClick = () => {
        currentUser ? (
            window.open('https://register.rockthevote.com/registrants/new?partner=39079', '_blank')
        ) : (
            history.push('/login')
        )
    }

    return (
        <div>
            <Container fluid className="py-4 px-5">
                <h1 align="center" className='py-5'>Register To Vote</h1>
                <p>Great! Registering to vote is easy.</p>
                <p>8by8 is partnering with Rock The Vote to help you register in just a couple minutes!</p>
                <Accordion id='yes' className='py-3' align='center'>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        What is Rock the Vote?
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                        Am I eligible?
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="1">
                            <Card.Body>body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <Row>
                    <Button id="button-style" onClick={handleClick}>Continue to Rock the Vote</Button>
                </Row>

                <p align="center">Not eligible? <a href="/actions">Other actions to help</a></p>
            </Container>
        </div>
    )
}
