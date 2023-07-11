import React from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/user-context";
import { PartnerContext } from "@/contexts/partner-context";
import Image from "next/image";
import "./ChallengerWelcome.scss";
import Top from "../../../assets/images/ChallengerWelcome/Top.png";
import Logo from "../../../assets/logos/white-logo.svg";
import StepOne from "../../../assets/images/ChallengerWelcome/StepOne.png";
import StepTwo from "../../../assets/images/ChallengerWelcome/StepTwo.png";
import StepThree from "../../../assets/images/ChallengerWelcome/StepThree.png";
import StepFour from "../../../assets/images/ChallengerWelcome/StepFour.png";

function ChallengerWelcome() {
  const router = useRouter();
  sessionStorage.setItem("UserType", "Challenger");

  const { activeUser } = useContext(UserContext);
  const { partnersExist } = useContext(PartnerContext);

  return (
    <div className="challenger-welcome">
      <div className="content-1">
        <Image className="background" src={Top} alt="background" />
        <div className="container">
          <Image className="logo" src={Logo} alt="8by8 Logo" />
        </div>
      </div>

      <div className="content-2">
        <div className="normal-title">Welcome!</div>
        <p className="normal-text">
          Closing the voter registration gap has to be a community effort, so
          we&apos;re asking everyone to join us in taking the
          #8by8Challenge—register 8 friends to register to vote in 8 days!
        </p>
        <button
          onClick={() => {
            console.log("This is firing.");
            router.push("/signup");
          }}
          className="gradient-button"
        >
          Get Started
        </button>
        {!activeUser && (
          <p className="small-text">
            Already have an account?{" "}
            <span className="link" onClick={() => router.push("/signin")}>
              Sign in
            </span>
          </p>
        )}
        <p className="link link-2" onClick={() => router.push("/why8by8")}>
          See why others are doing it
        </p>
      </div>

      <div className="content-3">
        <div className="small-title">Here&apos;s How it Works</div>

        <div className="normal-heading">1. Sign Up</div>
        <p className="normal-text">
          Sign up with your name and email address to get started.
        </p>
        <Image src={StepOne} alt="sign up" className="center-img" />

        <div className="normal-heading">2. Invite your friends</div>
        <p className="normal-text">
          Get 8 friends via social media or messaging apps to join your
          challenge.
        </p>
        <Image src={StepTwo} alt="invite your friends" className="center-img" />

        <div className="normal-heading">3. Friends take action</div>
        <p className="normal-text">
          Your friends can support your challenge by taking 1 of 3 actions:
          register to vote, set up election reminders, or take the challenge
          themselves. You&apos;ll earn 1 badge per friend who takes action!
        </p>
        <Image
          src={StepThree}
          alt="friends take action"
          className="center-img"
        />

        <div className="normal-heading">
          4. Win the challenge, get a reward!
        </div>
        <p className="normal-text">
          {partnersExist
            ? "When all 8 of your friends took action in your challenge within 8 days, and you win! Then select and enjoy a reward from one of our amazing partners."
            : "When you get 8 badges in 8 days, you win the challenge! Most importantly, you helped the community move closer to greater AAPI representation!"}
        </p>
        <Image
          src={StepFour}
          alt="earn 8 badges in 8 days"
          className="center-img"
        />

        <button
          onClick={() => router.push("/signup")}
          className="gradient-button"
          id="get-started"
        >
          Get Started
        </button>
        {!activeUser && (
          <p className="small-text">
            Already have an account?{" "}
            <span className="link" onClick={() => router.push("/signin")}>
              Sign in
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ChallengerWelcome;
