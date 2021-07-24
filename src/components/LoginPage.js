/**
 * login with email link also includes sign up.
 * login flow:
 *   step 1: user puts in email and clicks "Get login link"
 *           page shows "Check your email for a login link"
 *   step 2: user clicks on the login link in their email
 *           second page logs them in, while the first page is useless now
 */

import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase';
import errorMessage from '../errorMessage';
import { useHistory } from 'react-router-dom';

const localStorageEmailKey = 'verifyUserEmail';

export default function Login() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [emailVisible, setEmailVisible] = useState(true);
    const [buttonMessage, setButtonMessage] = useState(' '); // leave blank to hide button

    const emailRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        if (currentUser) {
            history.push('/challenge');
            return;
        }
        if (!auth.isSignInWithEmailLink(window.location.href)) {
            // login step 1
            setButtonMessage('Get email link');
            setMessage('Join now to #StopAsianHate at the ballot box.');
            buttonRef.current.onclick = async function () {
                const email = emailRef.current.value;
                try {
                    await auth.sendSignInLinkToEmail(email, {
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
                        handleCodeInApp: true
                    });
                    window.localStorage.setItem(localStorageEmailKey, email);
                    setEmailVisible(false);
                    setButtonMessage(null);
                    setMessage('Check your email for an email login link');
                } catch (e) {
                    setError(errorMessage(e));
                }
            };
        } else {
            // login step 2
            const verifyEmail = async (email) => {
                try {
                    await auth.signInWithEmailLink(email, window.location.href);
                } catch (e) {
                    setError(errorMessage(e));
                }
            };
    
            const storedEmail = window.localStorage.getItem(localStorageEmailKey);
            if (!storedEmail) {
                setMessage('Please re-enter your email');
                setButtonMessage('Verify email');
                buttonRef.current.onclick = () => verifyEmail(emailRef.current.value);
            } else {
                verifyEmail(storedEmail);
            }
        }
    }, [currentUser]);

    return (
        <div>
            <p>current login status (debug purposes): {currentUser === null ? 'Logged out' : currentUser.email}</p>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            {emailVisible && <input type='email' placeholder='email' ref={emailRef}></input>}
            {buttonMessage && <button ref={buttonRef}>{buttonMessage}</button>}
        </div>
    )
}
