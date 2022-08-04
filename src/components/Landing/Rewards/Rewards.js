import CurveA from "./../../../assets/2-shapes/curve-a.svg";
import './Rewards.scss';

const Rewards = () => {
    // Consistent data type
    // Also includes key since we will be iterating over it
    class Partner {
        static key = 0;
        constructor(name, img, type, location) {
            this.name = name;
            this.img = img;
            this.type = type;
            this.location = location;
            this.id = Partner.key++;
        }
    }

    
    // Sample Data
    const samplePartner = () => new Partner (
        "Joe's Sandwhiches",
        "https://c8.alamy.com/comp/FC20MT/sandwich-shop-in-milan-FC20MT.jpg",
        "Restaurant",
        "San Jose, CA"
    )

    // Store the list of partners here
    // Generate them with the constructor
    const partners = [
        samplePartner(),
        samplePartner(),
        samplePartner(),
        samplePartner()
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
                {partners.map((partner) => {
                    return (
                        <div className="sponsor" key={partner.id}>
                            <img src={partner.img} alt={`${partner.name} image`} />
                            <h5>{partner.name}</h5>
                            <p>{partner.type} {partner.location}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Rewards;