import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase";

// will be handled in another task
const sendEmail = (email_ctx) => {};

/**
 * Todo:
 * Include sending the appropriate email after each action
 * Include the correct logic to update firestore after each action
 */
const completeAction = async (action_ctx) => {
  const { actionString, playerId, challengerId } = action_ctx;

  // get reference to challenger's doc
  const challengerRef = doc(db, "users", challengerId);
  const challengerSnap = await getDoc(challengerRef);
  // if invalid challengerId is sent, exit function
  if (!challengerSnap.exists()) {
    return false;
  }

  // gets current challenger's badges
  const badgesQuery = challengerRef.collection("challenge").doc("challenge");
  const badgesSnapshot = await getDoc(badgesQuery);
  const { badges } = badgesSnapshot.data();

  // if player information is given, check for player based actions
  // if not, check for challenger based actions
  if (playerId) {
    // gets player information
    const playerRef = doc(db, "users", playerId);
    const playerSnap = await getDoc(playerRef);

    // handles invalid player input
    if (!playerSnap.exists()) {
      return false;
    }

    // will opt for these booleans and checking if a player is in challenger badges
    const { startedChallenge, isRegisteredVoter, notifyElectionReminders } =
      playerSnap.data();

    // if player has already contributed, exit
    // might be a problem depending on how we store player's progress
    if (badges.includes(playerId)) {
      return false;
    }

    if (actionString === "playerRegister") {
      if (isRegisteredVoter) {
        return false;
      }
    } else if (actionString === "playerReminder") {
      if (notifyElectionReminders) {
        return false;
      }
    } else if (actionString === "playerChallenge") {
      if (startedChallenge) {
        return false;
      }
    }
  } else if (actionString === "challengerRegister") {
    // checks if the challenger has already registered
    if (challengerRef.data()["isRegisteredVoter"]) {
      return false;
    }
    // handles case where challenger wants to register, but has already gotten sticker for sharing
    if (badges.includes(challengerId)) {
      console.log("Are you sure you want to register?");
    }
  } else if (actionString === "challengerShare") {
    // assumes that if the challenger has gotten a sticker by sharing, their name will be in badges
    if (badges.includes(challengerId)) {
      return false;
    }
  } else {
    // handles case where an invalid action string is given
    console.error("Invalid action!");
    return false;
  }

  // if everything occurs without errors, return true
  return true;
};
