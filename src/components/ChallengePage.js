import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function ChallengePage() {
    const { currentUser } = useAuth();
    const history = useHistory();
    return (
        <div>
            <p>current login status (debug purposes): {currentUser === null ? 'Logged out' : currentUser.email}</p>
            <p>Challenge page</p>
            <button onClick={() => history.push('/logout')}>Logout</button>
        </div>
    )
}
