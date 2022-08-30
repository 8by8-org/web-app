const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// signup function
exports.onSignup = functions.auth.user().onCreate(async (user) => {
  async function generateUniqueInviteCode() {
    const length = 8;
    const dictionary = "234579abcdefghjkmnpqrstwxyz"; // unambiguous characters

    const generateRandom = () => {
      let out = "";
      for (let i = 0; i < length; i++) {
        out += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
      }
      return out;
    };
    const checkIsRandom = (allegedRandom) => {
      // dumbest way of guaranteeing uniqueness but this will have to do for now
      return new Promise((resolve, reject) => {
        db.collection("users")
          .where("inviteCode", "==", allegedRandom)
          .get()
          .then((querySnapshot) => resolve(querySnapshot.empty))
          .catch(reject);
      });
    };

    let currentRandom = generateRandom();
    let timesRegenerated = 0;
    while (!(await checkIsRandom(currentRandom))) {
      currentRandom = generateRandom();
      if (++timesRegenerated >= 20) {
        // terminate before we drain away our resources
        throw new Error(
          "either by chance or something really bad happened, but 20 generated invite codes and still yielded no unique code"
        );
      }
    }
    if (timesRegenerated) {
      functions.logger.warn(`encountered ${timesRegenerated} collisions`);
    }
    return currentRandom;
  }

  const userRef = db.collection("users").doc(user.uid);
  if (!(await userRef.get().exists)) {
    userRef.set({
      email: user.email,
      name: user.displayName,
      avatar: "",
      inviteCode: await generateUniqueInviteCode(),
      invitedBy: "",
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
      notifyElectionReminders: false,
      isRegisteredVoter: false,
      startedChallenge: false,
      sharedChallenge: false,
      completedActionForChallenger: false,
      challengeEndDate: "",
      badges: [],
      voteInfo: {}
    });
  }
});
