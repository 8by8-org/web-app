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
      inviteCode: await generateUniqueInviteCode(),
      isRegisteredVoter: false,
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
});

// verifying recaptcha function (hasn't been implemented nor tested yet)
import fetch from "node-fetch";
exports.verifyReCaptcha = functions.https.onCall(async (data) => {
  const secret_key = "6LcVtjIeAAAAAMu7qszTrL0zjbdK_2ClFPW2jUMU";
  const response_key = data.response_key;

  await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new functions.https.HttpsError(
        "an error occured while calling the function: ",
        error
      );
    });
});
