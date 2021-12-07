const admin = require("firebase-admin");
const serviceAccount = require("./by8-318322-eecb45aef53d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
  const challengerRef = db.collection("users").doc(challengerId);
  const challengerSnap = await challengerRef.get();
  // if invalid challengerId is sent, exit function
  if (!challengerSnap.exists) {
    console.log("challenger snapshot does not exist");
    return false;
  }

  // gets current challenger's badges
  const badgesQuery = challengerRef.collection("challenge").doc("challenge");
  const badgesSnapshot = await badgesQuery.get();
  const { badges } = badgesSnapshot.data();

  // if player information is given, check for player based actions
  // if not, check for challenger based actions
  if (playerId) {
    // gets player information
    const playerRef = db.collection("users").doc(playerId);
    const playerSnap = await playerRef.get();

    // handles invalid player input
    if (!playerSnap.exists) {
      console.log("player does not exist");
      return false;
    }

    // will opt for these booleans and checking if a player is in challenger badges
    const { startedChallenge, isRegisteredVoter, notifyElectionReminders } =
      playerSnap.data();

    // if player has already contributed, exit
    // might be a problem depending on how we store player's progress
    if (badges.includes(playerId)) {
      console.log("player already in badges");
      return false;
    }

    if (actionString === "playerRegister") {
      if (isRegisteredVoter) {
        return false;
      }
      playerRef.update({ isRegisteredVoter: true });
      challengerRef.update({ badges: [...badges, playerId] });
    } else if (actionString === "playerReminder") {
      if (notifyElectionReminders) {
        return false;
      }
      playerRef.update({ notifyElectionReminders: true });
      challengerRef.update({ badges: [...badges, playerId] });
    } else if (actionString === "playerChallenge") {
      if (startedChallenge) {
        return false;
      }
      playerRef.update({ startedChallenge: true });
      challengerRef.update({ badges: [...badges, playerId] });
    }
  } else if (actionString === "challengerRegister") {
    // checks if the challenger has already registered
    if (challengerRef.data()["isRegisteredVoter"]) {
      console.log("challenger is already a registered voter");
      return false;
    }
    // handles case where challenger wants to register, but has already gotten sticker for sharing
    if (badges.includes(challengerId)) {
      console.log("Are you sure you want to register?");
      return false;
    }
    challengerRef.update({ badges: [...badges, challengerId] });
  } else if (actionString === "challengerShare") {
    // assumes that if the challenger has gotten a sticker by sharing, their name will be in badges
    if (badges.includes(challengerId)) {
      return false;
    }
    challengerRef.update({ badges: [...badges, challengerId] });
  } else {
    // handles case where an invalid action string is given
    console.error("Invalid action!");
    return false;
  }

  // if everything occurs without errors, return true
  return true;
};

completeAction({
  challengerId: "default",
  playerId: "placeholder",
  actionString: "playerRegister",
});
