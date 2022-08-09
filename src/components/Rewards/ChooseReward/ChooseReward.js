import {getUserDatabase} from "../../../functions/UserData";
import {useHistory} from "react-router-dom";
import './ChooseReward.scss';
import {useEffect, useState} from "react";
import placeholderImage from "../../../assets/images/placeholder-image.jpg"

const ChooseReward = () => {
    // Get the current player
    const currentUser = getUserDatabase();
    const history = useHistory();
    /*
     Sample data, once again we need to make this empty once we get the partners in the database
     */
    const [partners, setPartners] = useState([
        {
            inStore: true,
            online: false,
            slug: 'bobsburgers',
            name: "Bob's Burgers",
            description: "50% any entree w/ a large drink"
        },
        {
            inStore: false,
            online: true,
            slug: 'janesjelly',
            name: "Jane's Jelly Store",
            description: "10% off any online order"
        }
    ]);

    useEffect(() => {
        const getDataFromDB = async () => {
            // TODO: Implement this function
        }

        // Uncomment this line once the above is implemented
        // getDataFromDB().then(res => setPartners(res));
    }, [])

    const [selected, setSelected] = useState(null);

    // Calculate if the user is eligible for the challenge
    const isEligible = (user) => {
        return true;
        // Uncomment these before committing
        // if(!user.badges) return false;
        // return user.completedActionForChallenger || user.badges.length >= 8;
    }

    if (!isEligible(currentUser)) {
        history.push('/progress');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selected);
    }

    return (
        <div className="choose-reward">
            <h1><span className="text-underline">Choose</span> a Reward</h1>
            <p className='about-text'>You've won the 8by8 Challenge! Now choose your reward, you've earned it!</p>
            <form>
                <h2>In Store</h2>
                {partners.filter(partner => partner.inStore).map((partner) => {
                    return (
                        <div key={partner.slug} className='my-3'>
                            <input type="radio" name="sample" onChange={() => setSelected(partner.slug)} id={partner.slug}/>
                            <label className="radio-label" htmlFor={partner.slug}>
                                <div className="row partner-container">
                                    <div className="circle-container col-3">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="partner-content col-6">
                                        <h3>{partner.name}</h3>
                                        <p> {partner.description}</p>
                                    </div>
                                    <div className="image-container col-3">
                                        <img src={partner.img ? partner.img : placeholderImage} alt={'Partner image'}/>
                                    </div>
                                </div>
                            </label>
                        </div>
                    );
                })}
                <h2>Online</h2>
                {partners.filter(partner => partner.online).map((partner) => {
                    return (
                        <div key={partner.slug} className='my-3'>
                            <input type="radio" name="sample" onChange={() => setSelected(partner.slug)} id={partner.slug}/>
                            <label className="radio-label" htmlFor={partner.slug}>
                                <div className="row partner-container">
                                    <div className="circle-container col-3">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="partner-content col-6">
                                        <h3>{partner.name}</h3>
                                        <p> {partner.description}</p>
                                    </div>
                                    <div className="image-container col-3">
                                        <img src={partner.img ? partner.img : placeholderImage} alt={'Partner image'}/>
                                    </div>
                                </div>
                            </label>
                        </div>
                    );
                })}
                <div className="button-container">
                    <button className='reward-button' onClick={handleSubmit} disabled={!selected}>Get Reward</button>
                </div>
            </form>
        </div>
    )
}

export default ChooseReward;