//TODO: copy .scss code into styles folder

import CurveA from "../../public/assets/2-shapes/curve-a.svg";
//import './Rewards.scss';
import { useRouter } from "next/router";
import placeholderImage from "../../public/assets/images/placeholder-image.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";
import chefusLogo from "../../public/assets/partner-logos/chefus.png";

import {Partner} from "@/models/Partner";

type RewardsProps = {partners:Partner[]}

const Rewards = ({partners}: RewardsProps) => {
    const history = useRouter();

    // Consistent data type
    // Also includes key since we will be iterating over it
    const Chefus = new Partner(
        "Chefus",
        "https://www.chefus.com/",
        chefusLogo,
        "Online deliveries",
        "",
       )

    partners = [Chefus];


    return (
        <div className="Rewards">
            <div className="bg-black pt-32px pr-30px pl-30px pb-30px">
                <h1>
                    Rewards
                </h1>
                <p className="description-text">
                    Win the 8by8 challenge, and you&apos;ll recieve a reward from one of our amazing partners!
                </p>
            </div>
            <img className="curve" src={CurveA} alt="black curve" />
            <div className="sponsor-section">
                { /* If we have partners */}
                {partners && partners.length > 0 && partners.map((partner) => {
                    return (
                        <div className="sponsor" key={partner.partnerID}>
                            <a href={partner.partnerLink}>
                                <Image src={partner.partnerImg === null ? placeholderImage : partner.partnerImg} alt={partner.partnerName} />
                                <h5>{partner.partnerName}</h5>
                                <p>{partner.partnerType} {partner.partnerLoc}</p>
                            </a>
                        </div>
                    )
                })}

                { /* If we don't have any partners */}
                {partners && partners.length === 0 && (
                    <div className="sponsor">
                        <Image src={placeholderImage} alt="Placeholder" />
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