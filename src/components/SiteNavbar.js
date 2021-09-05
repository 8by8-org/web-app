import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function SiteNavbar() {
    const { currentUser } = useAuth();
    return (
        <Navbar expand="sm" bg="light" className="px-sm-5 px-2" sticky="top">
            <Navbar.Brand href="/">
                8by8
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="ms-auto">
                    <Nav.Link href="/challenge">Challenge</Nav.Link>
                    {currentUser ? <Nav.Link href="/logout">Logout</Nav.Link> : <><Nav.Link href="/login">Login</Nav.Link><Nav.Link href="/signup">Sign Up</Nav.Link></>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
