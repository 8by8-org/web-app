import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { completedAction } from "../../functions/UserData";
import { LoadingWheel } from "../LoadingWheel/LoadingWheel.component";
import { addInvitedBy } from "../../functions/AddInvite";
import "./ElectionReminder.scss";
const db = getFirestore();

export default function ElectionReminder() {
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showCompletedMessage, setShowCompletedMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  //get information for challenger who referred the player
  const { currentUser } = useAuth();

  const onSubmit = (
    firstNameInput,
    lastNameInput,
    addressLine1Input,
    zipCodeInput,
    emailAddressInput,
    updateUsers
  ) => {
    if (
      !firstNameInput.value ||
      !lastNameInput.value ||
      !addressLine1Input.value ||
      !zipCodeInput.value.match(/^[0-9]{5}(?:-[0-9]{4})?$/) ||
      !emailAddressInput.value.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      )
    ) {
      console.log("Please complete all of the required fields.");
      return;
    } else {
      completedAction("election reminders");
    }
  };

  useEffect(() => {
    async function initialize() {
      //get the information for the user and the referrer
      const userRef = doc(db, "users", currentUser.uid);

      //determine if the user has already signed up for election reminders
      const user = await getDoc(userRef);
      const uData = user.data();

      //if they have, show the completed message and return
      if (uData.hasSignedUpForReminders) {
        setShowContinueButton(true);
        setShowCompletedMessage("has_completed_reminders");
      }

      //first set up an observer to listen for mutations to the ngp-form div
      const targetNode = document.getElementsByClassName("ngp-form")[0];

      // Options for the observer (which mutations to observe)
      const config = { attributes: false, childList: true, subtree: true };

      //callback function that the observer will invoke upon observed mutations
      const mutationCallback = (mutationsList, observer) => {
        //empty variables to hold input elements
        let title,
          legend,
          titleUnderlined,
          titleNotUnderlined,
          prefix,
          fnameLabel,
          firstNameInput,
          lastNameInput,
          lnameLabel,
          addressLabel,
          addressLine1Input,
          zipCodeInput,
          emailLabel,
          emailAddressInput,
          submitBtn,
          thankYouDiv;

        //when changes to the DOM occur, loop through them and check if the appropriate inputs have been created
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            //elements to update text content
            legend = document.getElementsByClassName("at-legend")[0];
            fnameLabel = document.getElementById(
              "NVSignupForm61312-ContactInformation-FirstName"
            );
            lnameLabel = document.getElementById(
              "NVSignupForm61312-ContactInformation-LastName"
            );
            addressLabel = document.getElementById(
              "NVSignupForm61312-ContactInformation-AddressLine1"
            );
            emailLabel = document.getElementById(
              "NVSignupForm61312-ContactInformation-EmailAddress"
            );
            if (legend)
              legend.textContent =
                "8by8 partners with Rock the Vote to help you get reminders for upcoming elections near you, so you'll never miss an election!";

            if (fnameLabel) {
              if (fnameLabel.childNodes.length)
                fnameLabel.childNodes[0].textContent = "First Name*";
            }
            if (lnameLabel) {
              if (lnameLabel.childNodes.length)
                lnameLabel.childNodes[0].textContent = "Last Name*";
            }
            if (addressLabel) {
              if (addressLabel.childNodes.length)
                addressLabel.childNodes[0].textContent = "Street Address*";
            }
            if (emailLabel) {
              if (emailLabel.childNodes.length)
                emailLabel.childNodes[0].textContent = "Email*";
            }

            //elements to hide
            prefix = document.getElementById(
              "NVSignupForm61312-ContactInformation-Prefix"
            );
            if (prefix) prefix.remove();
            title = document.getElementsByClassName("at-title")[0];
            if (title) title.remove();

            //inputs
            firstNameInput = document.getElementsByName("FirstName")[0];
            lastNameInput = document.getElementsByName("LastName")[0];
            addressLine1Input = document.getElementsByName("AddressLine1")[0];
            zipCodeInput = document.getElementsByName("PostalCode")[0];
            emailAddressInput = document.getElementsByName("EmailAddress")[0];
            submitBtn = document.getElementsByClassName("at-submit")[0];
            thankYouDiv = document.getElementsByClassName("thankYou")[0];

            //if all input elements have loaded
            if (
              firstNameInput &&
              lastNameInput &&
              addressLine1Input &&
              zipCodeInput &&
              emailAddressInput &&
              submitBtn
            ) {
              //attach the onsubmit function to the submit button
              submitBtn.onclick = () =>
                onSubmit(
                  firstNameInput,
                  lastNameInput,
                  addressLine1Input,
                  zipCodeInput,
                  emailAddressInput
                );
            }

            //if the thankYouDiv has been created, the user has successfully submitted the form.
            if (thankYouDiv) {
              const fbShareBtn = document.getElementById("fbShareBtn");
              const twShareBtn = document.getElementById("twShareBtn");
              const contributionsDiv =
                document.getElementsByClassName("contributions")[0];
              if (fbShareBtn) fbShareBtn.remove(); //for now remove these share buttons as they do not share the 8by8 challenge link
              if (twShareBtn) twShareBtn.remove();
              //if the contributions div exists and its childNodes exist, the first should be an h1. capitalize the text
              if (contributionsDiv) {
                if (contributionsDiv.childNodes.length) {
                  contributionsDiv.childNodes[0].textContent =
                    "Thank you for joining us!";
                }
              }
              if (!showContinueButton) setShowContinueButton(true);
            }
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

      /*dynamically load the RTV script once the page is rendered and the observer instance is created, 
          so the RTV script can find the ngp-form div and the observer is listening for DOM changes*/
      const rtvScript = document.createElement("script");
      rtvScript.src = "https://d1aqhv4sn5kxtx.cloudfront.net/actiontag/at.js";
      document.body.appendChild(rtvScript);

      //when the page unmounts, remove the script so it can be loaded again when the component mounts again
      return () => {
        rtvScript.remove();
      };
      //   }
      // };
    }

    setTimeout(() => {
      if (localStorage.getItem("player") && currentUser) {
        addInvitedBy();
        setLoading(true);
      } else {
        setLoading(true);
      }
      initialize();
    }, 3000)
  }, []);

  return loading ? (
    <div className="election-reminder">
      <div className="electionReminderContainer">
        <header className="title">
          <u className="underline">GET ELEC</u>TION ALERTS
        </header>
        {!showCompletedMessage ? (
          <div
            className="ngp-form"
            data-form-url="https://actions.everyaction.com/v1/Forms/7VylZ7q7eEGLlwKVNb-MqQ2"
            data-fastaction-endpoint="https://fastaction.ngpvan.com"
            data-inline-errors="true"
            data-fastaction-nologin="true"
            data-databag="everybody"
          ></div>
        ) : (
          <div className="reminders-completed">
            <h3>Thank you for your action!</h3>
            <p>
              {showCompletedMessage === "has_completed_reminders"
                ? "You have already signed up for election reminders. If you would like to contribute in another manner, please continue."
                : "You have already contributed to this user's challenge. Please continue to explore more ways to contribute."}
            </p>
          </div>
        )}
        {showContinueButton && (
          <button
            id="continue"
            onClick={() => {
              history.push("/actions");
            }}
          >
            CONTINUE
          </button>
        )}
      </div>
    </div>
    ) : (
    <LoadingWheel overlay={false} />
    )
}
