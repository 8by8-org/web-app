import React, {useRef} from 'react';


export default function ChallengePagePopup(props) {
    const linkEl = useRef(null);
    const closePopup = (e) => {
        e.preventDefault();
        props.togglePopup();
    }
    // Will have to check the availability of navigator on different browsers and systems
    const copyToClipboard = () => {
        navigator.clipboard.writeText(linkEl.current.innerText);
    }
    return (
        <div style={{position: 'fixed', zIndex: 1, top:'50%', left: '50%', border: '1px solid black'}}>
            <button onClick={closePopup}>x</button>
            <p ref={linkEl}>Placeholder copy and paste</p>
            <button onClick={copyToClipboard}>Copy</button>
        </div>
    )
}