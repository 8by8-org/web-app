import PageContainer from "@/components/utils/page-container";
import { InviterContext } from "@/contexts/inviter-context";
import { UserContext } from "@/contexts/user-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext } from "react";
import StepFour from "../../public/assets/images/ChallengerWelcome/StepFour.png";
import BlackCurve from "../../public/assets/images/PlayerWelcome/BlackCurve.svg";
import SignUp1 from "../../public/assets/images/PlayerWelcome/SignUp1.png";
import SignUp2 from "../../public/assets/images/PlayerWelcome/SignUp2.png";
import Vote from "../../public/assets/images/PlayerWelcome/Vote1.png";
import styles from "../styles/modules/pages/playerwelcome.module.scss";

export default function PlayerWelcome() {
  const router = useRouter()
  const { activeUser } = useContext(UserContext);
  const { inviterInfo } = useContext(InviterContext);

  return (
    <PageContainer>
      <section className={styles.section_1}>
        
        <h1 className={styles.top_header}>
          <u className="underline">Support</u>{" "}
          {inviterInfo
            ? `${inviterInfo.name}'s`
            : "the"}{" "}
          8by8 Challenge!
        </h1>

        <p>
          <b className={styles.content}>
            Help{" "}
            {inviterInfo
              ? inviterInfo.name
              : "your friend"}{" "}
            win their <u>8by8 Challenge</u> by registering to vote or taking
            other actions to #stopasianhate!
          </b>
        </p>

        <button
          type="button"
          className={styles.get_started_btn}
          onClick={() => router.push(`/actions`)}
        >
          Get Started
        </button>
        
        {!activeUser && (
          <p className={styles.signin_line}>
            Already have an account?{" "}
            <Link
              className={styles.teal_link}
              href="/signin"
            >
              Sign In
            </Link>
          </p>
        )}
        
        <Link href="/why8by8" className={styles.teal_link}>
          See why others are doing it
        </Link>
      </section>

      <div className={styles.curve_container}>
        <Image 
          className={styles.black_curve}
          src={BlackCurve}
          alt="Black Curve" 
          id="black_curve"
          draggable={false}
        />
      </div>

      <section className={styles.section_2}>
        <h2 className="underline">Here&apos;s how it works</h2>

        <h3 className={styles.step_header}>1. Choose an action to take</h3>
        <p className={styles.step_text}>
          You can take any number of the available actions: register to vote,
          get election reminders or take the 8by8 challenge yourself. Pick one
          to start.
        </p>
        <Image src={SignUp1} alt="Take Action" className={styles.image} id="take_action" />

        <h3 className={styles.step_header}>2. Your friend will earn a badge</h3>
        <p className={styles.step_text}>
          Any of the 3 actions will help your friend earn a badge and get closer
          to winning the challenge.
        </p>
        <Image src={SignUp2} alt="Friend Earns a Badge" className={styles.image} id="earn_badge" />

        <h3 className={styles.step_header}>3. Come back and take more actions</h3>
        <p className={styles.step_text}>
          Whether it is to help the same friend or a different one, the more
          actions you take, the better! Note that you can only help earn one
          badge per friend.
        </p>
        <Image src={Vote} alt="More Actions" className={styles.image} id="more_actions" />

        <h3 className={styles.step_header}>4. Get a Reward!</h3>
        <p className={styles.step_text}>
          When your friend wins the challenge within 8 days, you win as well!
          Then select and enjoy a reward from one of our amazing partners.
        </p>
        <Image src={StepFour} alt="Get a Reward" className={styles.image} id="get_reward" />
        
        <button
          type="button"
          className={styles.get_started_btn}
          onClick={() => router.push(`/actions`)}
        >
          Get Started
        </button>
        
        {!activeUser && (
          <p className={styles.signin_line}>
            Already have an account?{" "}
            <Link
              className={styles.signin_link_black}
              href="/signin"
            >
              Sign In
            </Link>
          </p>
        )}
      </section>
    </PageContainer>
  );
}
