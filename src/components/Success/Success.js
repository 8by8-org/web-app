import { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import "./Success.scss";
import Iwon from "../../assets/images/Share/ChallengerShareWon.png";

export default function Success() {
  const history = useHistory();

  useEffect(() => {
    history.push(`/challengerwelcome`)
  }, []);


  return (
    <div className="main-content">
      <img src={Iwon} alt="I Won" />
      <h1>Help me in my 8by8 Challenge to #stopasianhate!</h1>
      <a href="/homepage">8by8.us</a>
    </div>
  );
}
