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
    });
  }
});

// verificaition email
exports.sendVerification = functions.auth.user().onCreate((user) => {
  const email = user.email;
  sendVerificationEmail(email, "verification");
});

// resend verification email
exports.resendVerification = functions.https.onRequest((req, res) => {
  const email = req.query.email;
  sendVerificationEmail(email, "verification");
  res.json({ result: "resending verification email" });
});

// sign in email
exports.sendSignin = functions.https.onRequest((req, res) => {
  const email = req.query.email;
  sendVerificationEmail(email, "sign in");
  res.json({ result: "sending signin email" });
});

function sendVerificationEmail(email, type) {
  const actionCodeSettings = {
    url: "http://localhost:3000/verify",
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
