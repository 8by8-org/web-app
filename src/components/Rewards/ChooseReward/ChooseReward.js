import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { useHistory } from "react-router-dom";
import placeholderImage from "../../../assets/images/placeholder-image.jpg";
import { choseReward, getChallengerDatabase, getUserDatabase } from "../../../functions/UserData";
import { getAllPartnerData } from "../../../functions/partnerData";
import './ChooseReward.scss';

const ChooseReward = () => {
    // Get the current player
    let currentUser = {}
    Promise.resolve(getUserDatabase()).then((value) => {currentUser = value})
    .then(() => {
        if(
            ((new URLSearchParams(window.location.search)).get('ref') !== "player"
            && (new URLSearchParams(window.location.search)).get('ref') !== "challenger"
            ) ||
            ((new URLSearchParams(window.location.search)).get('ref') === "challenger"
            &&
            currentUser.badges.length === 8 && 
            currentUser.challengeReward !== undefined) ||
            
            (((new URLSearchParams(window.location.search)).get('ref') === "player")
            && currentUser.playerReward !== undefined) ){
            document.location.href = "/"
           }
    });



    const history = useHistory();
    /*
     Sample data, once again we need to make this empty once we get the partners in the database
     */
    const [partners, setPartners] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(new Set([]));

    const handleModal = (n) =>{
        let tempSet = new Set([...openModal])
        if(tempSet.has(n)){
            tempSet.delete(n)
        }
        else{
            tempSet.add(n)
        }
        tempSet.size === 0 ? setOpenModal(new Set([])) : setOpenModal(tempSet)
    }

    if(!loaded) {
        getAllPartnerData((data) => {
            setPartners(Object.values(data));
        })
        setLoaded(true);
    }

    const [selected, setSelected] = useState(null);

    // Calculate if the user is eligible for the challenge
    const isEligible = (user) => {
        return true;
        if (!user.badges) return false;
        // Get the challenger data
        const challenger = getChallengerDatabase();
        if(!challenger.badges) return false;
        return challenger.badges.length >= 8 || user.badges.length >= 8;
    }

    if (!isEligible(currentUser)) {
        history.push('/signup');
    }

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const rewardFor = (new URLSearchParams(window.location.search)).get('ref')
        choseReward(selected, rewardFor).then(
            () =>
            {
                if(rewardFor === "player"){
                    window.location.replace("/actions")
                }
                else{
                    window.location.replace("/progress")
                }
            }
        )
    }

    return (
        <div className="choose-reward">
            <h1><span className="text-underline">Choose</span> a Reward</h1>
            <p className='about-text'>You've won the 8by8 Challenge! Now choose your reward, you've earned it!</p>
            <form>
                <h2 className='reward-type-header' style={{display : partners.filter(partner => partner.rewardType === 'In-store' && partner.rewardAvailable).length === 0 ? "none" : "inherit"}}>In Store</h2>
                { /* We have some code duplication here - splitting into a component is more complicated than its worth */}
                {partners.filter(partner => (partner.rewardType === 'In-store'  && partner.rewardAvailable)).map((partner) => {
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
                                        <p> {partner.rewardDescription}</p>
                                        
                                    </div>
                                    <div className="image-container col-3">
                                        <button onClick={() => handleModal(partner.name)} > 
                                            <img src={ partner.logo ? partner.logo : placeholderImage} alt="Partner"/>
                                        </button>
                                    </div>
                                </div>
                            </label>
                            {
                                    [...openModal].filter(p => p === partner.name).length === 1 
                                        && 
                                        <div className="popup-modal">
                                        <div className="modalBackground">
                                            <div className="light-modal-container">
                                            <div className="titleCloseBtn">
                                                <button
                                                onClick={() => {
                                                    setOpenModal(partner.name);
                                                }}
                                                >
                                                <AiOutlineClose />
                                                </button>
                                            </div>
                                            <div className="content">
                                            <img src={partner.logo ? partner.logo : placeholderImage } alt="Partner"/>
                                                <h3>{partner.name}</h3>
                                                <p className="b6">
                                                    {partner.businessDescription}
                                                </p>
                                                <span className="b6">
                                                    {MdLocationPin}
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#7f7f7f" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="odd" clip-rule="odd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="#7f7f7f" />
                                                        <path fill-rule="even" clip-rule="even" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="white" />
                                                    </svg>
                                                    {partner.locationType}
                                                </span>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    }
                        </div>
                    );
                })}
                <h2 className='reward-type-header' style={{display : partners.filter(partner => partner.rewardType === 'Online' && partner.rewardAvailable).length === 0 ? "none" : "inherit"}}>Online</h2>
                {partners.filter(partner => partner.rewardType === 'Online' && partner.rewardAvailable).map((partner) => {
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
                                        <p> {partner.rewardDescription}</p>
                                    </div>
                                    <div className="image-container col-3">
                                        <button onClick={() => handleModal(partner.name)} >
                                            <img src={partner.logo ? partner.logo : placeholderImage } alt="Partner"/>
                                        </button>
                                    </div>
                                </div>
                            </label>
                            { 
                                        [...openModal].filter(p => p === partner.name).length === 1 
                                        &&
                                        <div className="popup-modal">
                                        <div className="modalBackground">
                                            <div className="light-modal-container">
                                            <div className="titleCloseBtn">
                                                <button
                                                onClick={() => {
                                                    setOpenModal(partner.name);
                                                }}
                                                >
                                                <AiOutlineClose />
                                                </button>
                                            </div>
                                            <div className="content">
                                            <img src={partner.logo ? partner.logo : placeholderImage } alt="Partner"/>
                                                <h3>{partner.name}</h3>
                                                <p className="b6">
                                                    {partner.businessDescription}
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    }
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