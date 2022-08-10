import {getUserDatabase} from "../../../functions/UserData";
import {useHistory} from "react-router-dom";
import './ChooseReward.scss';
import {useEffect, useState} from "react";
import placeholderImage from "../../../assets/images/placeholder-image.jpg"
import {database} from '../../../firebase';
import {ref, child, get} from 'firebase/database';

const ChooseReward = () => {
    // Get the current player
    const currentUser = getUserDatabase();
    const history = useHistory();
    /*
     Sample data, once again we need to make this empty once we get the partners in the database
     */
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        // Get the partner data from the database
        const getDataFromDB = async () => {
            const dbRef = ref(database);
            get(child(dbRef, `partners`)).then((snapshot) => {
                const data = snapshot.val();
                setPartners(Object.values(data));
            });
        }

        getDataFromDB().then();
    }, [])

    const [selected, setSelected] = useState(null);

    // Calculate if the user is eligible for the challenge
    const isEligible = (user) => {
        if (!user.badges) return false;
        return user.completedActionForChallenger || user.badges.length >= 8;
    }

    if (!isEligible(currentUser)) {
        history.push('/progress');
    }

    // Handle Form Submission
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
                { /* We have some code duplication here - splitting into a component is more complicated than its worth */}
                {partners.filter(partner => partner.rewardType === 'In-Store').map((partner) => {
                    return (
                        <div key={partner.name} className='my-3'>
                            <input type="radio" name="sample" onChange={() => setSelected(partner.name)}
                                   id={partner.name}/>
                            <label className="radio-label" htmlFor={partner.name}>
                                <div className="row partner-container">
                                    <div className="circle-container col-3">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="partner-content col-6">
                                        <h3>{partner.name}</h3>
                                        <p> {partner.businessDescription}</p>
                                    </div>
                                    <div className="image-container col-3">
                                        <img src={ /* partner.logo ? partner.logo : placeholderImage */ placeholderImage} alt={'Partner image'}/>
                                    </div>
                                </div>
                            </label>
                        </div>
                    );
                })}
                <h2>Online</h2>
                {partners.filter(partner => partner.rewardType === 'Online').map((partner) => {
                    return (
                        <div key={partner.name} className='my-3'>
                            <input type="radio" name="sample" onChange={() => setSelected(partner.name)}
                                   id={partner.name}/>
                            <label className="radio-label" htmlFor={partner.name}>
                                <div className="row partner-container">
                                    <div className="circle-container col-3">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="partner-content col-6">
                                        <h3>{partner.name}</h3>
                                        <p> {partner.businessDescription}</p>
                                    </div>
                                    <div className="image-container col-3">
                                        <img src={ /* partner.logo ? partner.logo : placeholderImage */ placeholderImage} alt={'Partner image'}/>
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