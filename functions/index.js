const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const FormData = require("form-data");

admin.initializeApp();
const db = admin.firestore();

// signup function
exports.onSignup = functions.auth.user().onCreate(async (user) => {
  const userRef = db.collection("users").doc(user.uid);
  if (!(await userRef.get().exists)) {
    userRef.set({
      email: user.email,
      name: "",
      avatar: "",
      invitedBy: "",
      accountCreated: admin.firestore.FieldValue.serverTimestamp(),
      notifyElectionReminders: false,
      isRegisteredVoter: false,
      startedChallenge: false,
      sharedChallenge: false,
      completedActionForChallenger: false,
      challengeEndDate: "",
      badges: [],
      voteInfo: {},
    });
  }
});

// verificaition email
exports.sendVerification = functions.auth.user().onCreate((user) => {
  const email = user.email;
  sendVerificationEmail(email, "verification");
});

// resend verification email
exports.resendVerification = functions.https.onCall((email) => {
  sendVerificationEmail(email, "verification");
});

// sign in email
exports.sendSignin = functions.https.onCall((email) => {
  sendVerificationEmail(email, "sign in");
});

function sendVerificationEmail(email, type) {
  let test = false;
  let actionUrl = "https://app.8by8.us/signin";
  // uncomment when testing
  test = true;
  if (test) {
    actionUrl = "http://localhost:3000/signin";
  }

  const actionCodeSettings = {
    url: actionUrl,
    handleCodeInApp: true,
  };
  if (type === "verification") {
    admin
      .auth()
      .generateEmailVerificationLink(email, actionCodeSettings)
      .then((link) => {
        const URL = "https://usvotes-6vsnwycl4q-uw.a.run.app/email/";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("type", "verifyEmail");
        formData.append("verifyLink", link);
        fetch(URL, {
          method: "POST",
          body: formData,
        });
      });
  } else if (type === "sign in") {
    admin
      .auth()
      .generateSignInWithEmailLink(email, actionCodeSettings)
      .then((link) => {
        const URL = "https://usvotes-6vsnwycl4q-uw.a.run.app/email/";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("type", "verifyEmail");
        formData.append("verifyLink", link);
        fetch(URL, {
          method: "POST",
          body: formData,
        });
      });
  }
}
