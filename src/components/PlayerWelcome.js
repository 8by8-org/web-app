import { useHistory } from 'react-router-dom'
import SignUp1 from "../assets/images/PlayerWelcome/SignUp1.png"
import SignUp2 from "../assets/images/PlayerWelcome/SignUp2.png"
import Vote from "../assets/images/PlayerWelcome/Vote1.png"
import Calendar from "../assets/images/PlayerWelcome/Complete1.svg"
import Top from '../assets/images/PlayerWelcome/Top.svg'
import './PlayerWelcome.scss'

export default function PlayerWelcome() {
    const history = useHistory(); 

    return (
        <div className="player-welcome">
            <div className="top" align="center">
                <img src={Top}/>
            </div>
            <div className="main-content">
                <div>
                    <h2 className="heading"><u className="underline">Support</u> Yang's 8by8 Challenge!</h2>
                    <div align="center">
                        <img src={Calendar} />
                    </div>
                </div>
                <div className="text">
                    <p>
                        <b>
                            Help "challenger" win their <u>8BY8 Challenge</u> by registering to vote or taking other ctions to #stopasianhate!
                        </b>
                    </p>
                </div>
                <div>
                    <button onClick={() => {history.push("/actions")}}>Get Started</button>
                </div>
                <div align="center">
                    <p className="small-text">Already have an account? Sign In</p>
                </div>
                <div>
                    <h3 className="heading"><u className="underline">Here's how it works</u></h3>
                </div>
                <p className="subheading">
                    1. ALL WE NEED IS YOUR ACTION
                </p>
                <p className="text">
                    You can take any number of the available actions: register to vote, get election reminders, 
                    or take the 8by8 challenge yourself. Pick one to start.
                </p>
                <div className="image">
                        <img src={SignUp1} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    2. YOUR FRIEND WILL EARN A BADGE
                </p>
                <p className="text">
                    Any of the 3 actions will help your friend earn a badge, and get closer to winning the challenge.
                </p>
                <div className="image">
                        <img src={SignUp2} alt="8by8 Logo" />
                </div>
                <p className="subheading">
                    3. COME BACK AND TAKE MORE ACTIONS
                </p>
                <p className="text">
                    Whether it is to help the same friend or a different one, the more action you take, the better! 
                    Note that you can only help earn on badge per friend.     
                </p>
                <div className="image">
                        <img src={Vote} alt="8by8 Logo" />
                </div>
                <button onClick={() => {history.push("/actions")}}>Get Started</button>
                    <p className="small-text" align="center">Already have an account? Sign In</p>
            </div>
            </div>
    )
}
