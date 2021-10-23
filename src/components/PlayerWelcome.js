import { Button, Row, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function PlayerWelcome() {
    const history = useHistory(); 

    return (
        <div>
            <Container fluid className="py-4 px-5">
                <Row align="center">
                    <h1>Welcome</h1>
                </Row>
                <Row>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
                </Row>
                <Row>
                    <Button id="button-style" className="py-2" onClick={() => {history.push("/actions")}}>Let's Start</Button>
                </Row>
            </Container>
            </div>
    )
}
