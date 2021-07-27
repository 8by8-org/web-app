import React from 'react';
import { useHistory } from 'react-router-dom';


export default function LandingPage() {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push('/login')}>Take the challenge</button>
        </div>
    )
}
