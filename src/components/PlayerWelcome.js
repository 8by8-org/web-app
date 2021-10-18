import React from "react";
import { getUserData } from "./URLEncode";
import { getFirestore, FieldValue } from 'firebase/firestore';
import { useHistory } from 'react-router'
import { Button, Row } from 'react-bootstrap'
import './PlayerWelcome.css'
import { Container } from 'react-bootstrap';

export default function PlayerWelcome() {
    const history = useHistory(); 
    const url = window.location.href;
    const code = new URLSearchParams(url);
    const userData = getUserData(code);

    // Check if user found
    const userFound = typeof userData !== "string";

    if (userFound) {
        // Get user data
        const uid = userData.uid;
        const name = userData.name;
        const email = userData.email;

        // Set user data in local storage
        localStorage.setItem("uid", uid);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        // Set relationship in db
        const db = getFirestore();
        db.collection("users").doc(uid)
            .collection("challenge").doc("challenge").update({
                badges: FieldValue.arrayUnion(uid)
        });
    } else {
        console.log("Invalid code, user not found...");
        const uid = "0000";
        const name = "John Doe";
        const email = "none@none.com";
    }

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
