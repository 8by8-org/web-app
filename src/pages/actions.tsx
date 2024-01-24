// Image for reward does not appear properly.
// Voter form modal needs testing

import ConfettiAnimation from "@/components/confetti-animation/confetti-animation";
import ErrorModal from "@/components/error-modal/error-modal";
import PageContainer from "@/components/utils/page-container";
import { InviterContext } from "@/contexts/inviter-context";
import { RewardsContext } from "@/contexts/rewards-context";
import { UserContext } from "@/contexts/user-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import Avatar1 from "../../public/assets/3-avatars/avatar-1.svg";
import Avatar2 from "../../public/assets/3-avatars/avatar-2.svg";
import Avatar3 from "../../public/assets/3-avatars/avatar-3.svg";
import Avatar4 from "../../public/assets/3-avatars/avatar-4.svg";
import Crown from "../../public/assets/images/Actions/Crown.svg";
import WhiteCurve from "../../public/assets/images/Actions/Union.svg";
import PopupModal from '../components/utils/popup-modal';
import { statesVoteInfo } from "../data/state_vote_info";
import styles from "../styles/modules/pages/actions.module.scss";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
// const apiUrl = "https://usvotes-6vsnwycl4q-uw.a.run.app";

interface Reward {
  logo: string,
  rewardAvailable: boolean,
  rewardDescription: string,
  redemptionDescription: string,
  rewardEndDate: Date | undefined
}

interface StateInfo {
  name: string,
  onlinereg: boolean,
  voteregsite: string
}

export default function Actions() {
  const router = useRouter()
  const { activeUser } = useContext(UserContext);
  const { inviterInfo } = useContext(InviterContext);
  const { rewardsInfo } = useContext(RewardsContext);
  const [rewardsAvailable, setRewardsAvailable] = useState<boolean>(false);

  const [choosenReward, setChoosenReward] = useState<Reward>({
    logo: "",
    rewardAvailable: false,
    rewardDescription: "",
    redemptionDescription: "",
    rewardEndDate: undefined
  });
  const [playerStateInfo, setPlayerStateInfo] = useState<StateInfo>({
    name: "",
    onlinereg: false,
    voteregsite: ""
  });

  const [showVoterFormModal, setShowVoterFormModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const closeVoterFormModal = () => setShowVoterFormModal(false)
  // const closeErrorModal = () => setShowErrorModal(false)

  const currentTime = new Date();

  useEffect(() => {
    if (rewardsInfo) {
      for (let i in rewardsInfo) {
        if (rewardsInfo[i].rewardAvailable) {
          setRewardsAvailable(true);
          break;
        }
      }
    }
    
    if (activeUser) {
      if (rewardsInfo && activeUser.playerReward) {
        for (let i in rewardsInfo) {
          if (rewardsInfo[i].name === activeUser.playerReward) {
            setChoosenReward({
              logo: rewardsInfo[i].logo,
              rewardAvailable: rewardsInfo[i].rewardAvailable,
              rewardDescription: rewardsInfo[i].rewardDescription,
              redemptionDescription: rewardsInfo[i].redemptionDescription,
              rewardEndDate: rewardsInfo[i].rewardEndDate
            });
            break;
          }
        }
      }

      if (activeUser.playerState) {setPlayerStateInfo(statesVoteInfo[activeUser.playerState])}
    }
  },[]);
  
  return (
    inviterInfo && activeUser &&
    <PageContainer>
      <div>
        {activeUser.registeredVoter && activeUser.notifyElectionReminders && activeUser.startedChallenge && <ConfettiAnimation time={8000} />}

        <section className={styles.section_1}>
          <div className={ !(activeUser.registeredVoter && activeUser.notifyElectionReminders && activeUser.startedChallenge)
              ? styles.status
              : styles.actions_completed
            }
          >
            {activeUser.registeredVoter ||
            activeUser.notifyElectionReminders ||
            activeUser.startedChallenge ? (
              <h1 className={styles.heading}>
                {inviterInfo.finishedChallenge
                  ? choosenReward.logo
                    ? <span>Here&apos;s <br/>your <br/>reward! </span>
                    : <span>Challenge <br/>Won! </span>
                  : !(activeUser.registeredVoter && activeUser.notifyElectionReminders && activeUser.startedChallenge) 
                      ? <span>You <br/>Took <br/>Action! </span>
                      : <span>You are done! <br />You Supported: </span>
                  }
              </h1>
            ) : (
              <h1 className={styles.heading}>
                <span>Take <br/>Action <br/>For: </span>
              </h1>
            )}
            

            <div className={styles.avatar_container}>
              <div>
                <Image
                  alt="Inviter Avatar"
                  src={avatars[inviterInfo.avatar - 1]}
                  id="inviter-avatar"
                />
                {(activeUser.registeredVoter ||
                  activeUser.notifyElectionReminders ||
                  activeUser.startedChallenge) && (
                    <Image
                      alt="Inviter Crown"
                      src={Crown}
                      className={styles.crown}
                    />
                )}
              </div>

              <h3 id="inviter-name" className={styles.inviter_name}>{inviterInfo.name}</h3>
            </div>
          </div>

          {choosenReward.logo && (
            choosenReward.rewardAvailable ?
              choosenReward.rewardEndDate === undefined || choosenReward.rewardEndDate.valueOf() - currentTime.valueOf() > 0 ?
                <div className={styles.couponContainer}>
                  <div className={styles.rewardLogo}>
                    <Image fill src={choosenReward.logo} alt="Partner Logo" id="reward-logo" />
                  </div>
                  <p>{choosenReward.rewardDescription}</p>
                  <p>
                    {choosenReward.redemptionDescription} Expires{" "}
                    {choosenReward.rewardEndDate === undefined
                      ? " never"
                      : choosenReward.rewardEndDate.toLocaleDateString()}
                    . Availability and terms subject to change.
                  </p>
                </div>
              :
                <div className={styles.couponContainer}>
                  <h2>Reward Expired</h2>
                  <p className={styles.content}>
                    Your reward has expired. Don&apos;t 
                    <br/>worry! Help a friend win their 
                    <br/>challenge to get a new reward.
                  </p>
                </div>
            :
              <div className={styles.couponContainer}>
                <h2>Reward No Longer <br/>Available</h2>
                <p className={styles.content}>
                  Your reward has been removed by 
                  <br/>our partner. Don&apos;t worry! Help a 
                  <br/>friend win their challenge to get a 
                  <br/>new reward.
                </p>
              </div>
          )}
        </section>
        
        <div className={styles.curve_container}>
          <Image 
            alt="White Curve" 
            id="white_curve" 
            src={WhiteCurve} 
            className={styles.white_curve}
            draggable={false}
          />
        </div>
        
        <section className={styles.section_2}>
          {!(activeUser.registeredVoter && activeUser.notifyElectionReminders && activeUser.startedChallenge) ? 
          <div>
            {(activeUser.registeredVoter ||
              activeUser.notifyElectionReminders ||
              activeUser.startedChallenge) && (
                <h3 className={styles.subheading}>
                  {inviterInfo.finishedChallenge ? (
                    choosenReward.logo ? (
                      <span>
                        {inviterInfo.name} won the 
                        8by8 challenge! <br /> here are Other actions to help 
                        <br /> the aapi community.
                      </span>
                    ) : (
                      <span>
                        {inviterInfo.name} won the 
                        8by8 challenge, <br /> and you get a reward!
                      </span>
                    )
                  ) : (
                    <span>
                      {inviterInfo.name} GOT A BADGE!
                      <br /> HERE ARE OTHER ACTIONS TO HELP <br /> THE AAPI 
                      COMMUNITY. <br />
                    </span>
                  )}
                </h3>
            )}



            {(activeUser.registeredVoter ||
              activeUser.notifyElectionReminders ||
              activeUser.startedChallenge) && 
              inviterInfo.finishedChallenge && 
              !choosenReward.logo && 
              rewardsAvailable && 
            (
              <button
                type="button"
                className={styles.first_button}
                onClick={() => router.push(`/choosereward`)}
              >
                <span>Choose a Reward</span>
              </button>
            )}
            
            {!activeUser.registeredVoter && (
              <button
                type="button"
                className={(activeUser.notifyElectionReminders || activeUser.startedChallenge) && inviterInfo.finishedChallenge && rewardsAvailable
                  ? styles.second_button
                  : styles.first_button 
                }
                onClick={() => router.push(`/voterreg`)}
              >
                <span>Register to vote</span>
              </button>
            )}

            {!activeUser.notifyElectionReminders && (
              <button
                type="button"
                className={activeUser.registeredVoter && (!inviterInfo.finishedChallenge || !rewardsAvailable)
                  ? styles.first_button 
                  : styles.second_button
                }
                onClick={() => router.push(`/electionreminders`)}
              >
                <span>Get election reminders</span>
              </button>
            )}

            {!activeUser.startedChallenge && (
              <button
                type="button"
                className={
                  activeUser.registeredVoter && activeUser.notifyElectionReminders && (!inviterInfo.finishedChallenge || !rewardsAvailable)
                    ? styles.first_button
                    : styles.second_button
                }
                onClick={() => router.push("/challengerwelcome")}
              >
                <span>Take the challenge</span>
              </button>
            )}

            <div>
              {activeUser.registeredVoter &&
                !activeUser.notifyElectionReminders &&
                !activeUser.startedChallenge && (
                  <h6 className={styles.text}>
                    Thanks for registering to vote!
                  </h6>
                )}

              {!activeUser.registeredVoter &&
                activeUser.notifyElectionReminders &&
                !activeUser.startedChallenge && (
                  <h6 className={styles.text}>
                    Thanks for getting election reminders!
                  </h6>
                )}

              {!activeUser.registeredVoter &&
                !activeUser.notifyElectionReminders &&
                activeUser.startedChallenge && (
                  <h6 className={styles.text}>
                    Thanks for taking the challenge!
                  </h6>
                )}

              {(activeUser.registeredVoter || activeUser.notifyElectionReminders) &&
                activeUser.startedChallenge && (
                  <h6 className={styles.text}>
                    Thanks for your actions!
                  </h6>
                )}
              
              {activeUser.registeredVoter && activeUser.notifyElectionReminders &&
                !activeUser.startedChallenge && (
                  <h6 className={styles.text}>
                    Voting matters towards better AAPI <br />
                    representation in our country. You can help <br />
                    the community by encouring others to <br />
                    register! Take the challenge on your own! <br />
                  </h6>
                )}

              <div className={styles.links_container}>
                {(activeUser.registeredVoter || playerStateInfo.name) &&
                  <div>
                    {playerStateInfo.onlinereg && (
                      <Link
                        href={playerStateInfo.voteregsite}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.links}
                      >
                        Go to state website
                      </Link>
                    )}
                    
                    <button
                      type="button"
                      className={styles.button_link}
                      onClick={() => {setShowVoterFormModal(true)}}
                    >
                      Get your registration form again
                    </button>
                  </div>
                }

                {((activeUser.registeredVoter &&
                  !activeUser.notifyElectionReminders &&
                  !activeUser.startedChallenge) ||
                  (!activeUser.registeredVoter &&
                    activeUser.notifyElectionReminders &&
                    !activeUser.startedChallenge)) && (
                  <button
                    type="button"
                    className={styles.button_link}
                  >
                    Share about your action
                  </button>
                )}

                {(((activeUser.registeredVoter || activeUser.notifyElectionReminders) &&
                  activeUser.startedChallenge) || (activeUser.registeredVoter && 
                  activeUser.notifyElectionReminders && !activeUser.startedChallenge)) && (
                    <button
                      type="button"
                      className={styles.button_link}
                    >
                      Share about your actions
                    </button>
                  )}

                {activeUser.startedChallenge && (
                  <Link href="/signin" className={styles.links}>
                    See your challenge
                  </Link>
                )}
              </div>
            </div>
            
          </div>
          :
          <div>
            {inviterInfo.finishedChallenge && !choosenReward.logo && rewardsAvailable && (
              <button
                type="button"
                className={styles.first_button}
                onClick={() => router.push(`/choosereward`)}
              >
                <span>Choose a Reward</span>
              </button>
            )}
            
            <button
              type="button"
              className={
                inviterInfo.finishedChallenge && rewardsAvailable 
                  ? styles.second_button
                  : styles.first_button
              }
              onClick={() => router.push(`/signin`)}
            >
              <span>See Your Challenge</span>
            </button>

            <button
              type="button"
              className={styles.second_button}
            >
              <span>Share About Your Actions</span>
            </button>

            {playerStateInfo.onlinereg && (
              <button
                type="button"
                onClick={() => window.open(playerStateInfo.voteregsite, "_blank")}
                className={styles.second_button}
              >
                <span>Go to state website</span>
              </button>
            )}

            <button
              type="button"
              className={styles.second_button}
              onClick={() => {setShowVoterFormModal(true)}}
            >
              <span>Get your registration form again</span>
            </button>
          </div>
          }
        </section>
      </div>
      
      
      {showVoterFormModal && (
        <PopupModal
          ariaLabel="Something went wrong."
          theme="light" 
          isOpen={showVoterFormModal}
          closeModal={closeVoterFormModal}
        >
          <p className={styles.modal_heading}>
            We emailed you!
          </p>

          <p className={styles.modal_text}>
            Check your email to get your voter registration PDF form.
          </p>

          <button
            type="button"
            className={styles.modal_ok_btn}
            onClick={closeVoterFormModal}
          >
            OK
          </button>
        </PopupModal>
      )}
      
      {/* {showErrorModal && 
        <ErrorModal 
          isErrorModalShown={showErrorModal}
          closeErrorModal={closeErrorModal}
        />
      } */}
    </PageContainer>
  )
}
