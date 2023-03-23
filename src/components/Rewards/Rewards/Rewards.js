import CurveA from "../../../assets/2-shapes/curve-a.svg";
import './Rewards.scss';
import { useHistory } from "react-router-dom";
import placeholderImage from "../../../assets/images/placeholder-image.jpg";
import chefusLogo from "../../../assets/partner-logos/chefus.png";
import purelyLogo from "../../../assets/partner-logos/purely.png";
import saltalkLogo from "../../../assets/partner-logos/saltalk.png";
import tippsyLogo from "../../../assets/partner-logos/tippsy.png";

const Rewards = () => {
    const history = useHistory();

    // Consistent data type
    // Also includes key since we will be iterating over it
    class Partner {
        static key = 0;
        constructor(name, link, img, type, location) {
            this.name = name;
            this.link = link;
            this.img = img;
            this.type = type;
            this.location = location;
            this.id = Partner.key++;
        }
    }


    // Sample Data
    const Chefus = new Partner(
        "Chefus",
        "https://www.chefus.com/",
        chefusLogo,
        "Online deliveries",
        "",
       )

    const Purely = new Partner(
        "Purely Drinks",
        "https://purelydrinks.com/",
        purelyLogo,
        "Online deliveries",
        "",
    )

    const Saltalk = new Partner(
        "Saltalk",
        "https://www.saltalk.com/",
        saltalkLogo,
        "Online deliveries",
        "",
    )

    const Tippsy = new Partner(
        "Tippsy",
        "https://www.tippsysake.com/",
        tippsyLogo,
        "Online deliveries",
        "",
    )


    // Store the list of partners here
    // Generate them with the constructor
    // That way there is a key
    const partners = [
       Chefus, Purely, Saltalk, Tippsy
    ]


    return (
        <div className="Rewards">
            <div className="bg-black pt-32px pr-30px pl-30px pb-30px">
                <h1>
                    Rewards
                </h1>
                <p className="description-text">
                    Win the 8by8 challenge, and you'll recieve a reward from one of our amazing partners!
                </p>
            </div>
            <img className="curve" src={CurveA} alt="black curve" />
            <div className="sponsor-section">
                { /* If we have partners */}
                {partners.length > 0 && partners.map((partner) => {
                    return (
                        <div className="sponsor" key={partner.id}>
                            <a href={partner.link}>
                                <img src={partner.img === "" ? placeholderImage : partner.img} alt={partner.name} />
                                <h5>{partner.name}</h5>
                                <p>{partner.type} {partner.location}</p>
                            </a>
                        </div>
                    )
                })}

                { /* If we don't have any partners */}
                {partners.length === 0 && (
                    <div className="sponsor">
                        <img src={placeholderImage} alt="Placeholder" />
                        <p>
                            Unfortunately, we are not offering partner rewards at this time. You can still take the 8by8 Challenge to help the AAPI community!
                        </p>
                        <button
                            className="challenge-button"
                            onClick={() => history.push("/challengerwelcome")}
                        >
                            Take the Challenge!
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Rewards;