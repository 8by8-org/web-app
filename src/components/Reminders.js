import { React } from 'react'
import { Row, Button, Container, Accordion, Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router';

export default function Actions() {
    const { currentUser } = useAuth();
    const history = useHistory();
    
    const handleClick = () => {
        currentUser? (
            window.open(window.open('https://www.rockthevote.org/how-to-vote/get-election-reminders/', '_blank'))
        ) : (
            history.push('/login')
        )
    }

    return (
        <div>
            <Container fluid className="py-4 px-5">
                <Row align="center">
                    <h1>Election Reminders</h1>
                </Row>
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
                    <Button onClick={handleClick}>Continue to Rock the Vote</Button>
                    <p align="center">Not eligible? <a href="/actions">Other actions to help</a></p>
                </Row>
            </Container>
        </div>
    )
}
