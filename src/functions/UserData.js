import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth } from "../firebase";
import { emailUser } from "./Email";

const db = getFirestore();

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// gets user's data from firebase
export async function getUserDatabase() {
  let uid = auth.getAuth().currentUser.uid;
  let docRef = doc(db, "users", uid);
  let docSnap = await getDoc(docRef);
  if (!docSnap.exists() || docSnap.data().avatar === undefined) {
    // tries to find user doc 5 times
    for (let i = 0; i < 5; i++) {
      console.log("trying for " + i + " times");
      await delay(3000);
      uid = auth.getAuth().currentUser.uid;
      docRef = doc(db, "users", uid);
      docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().avatar !== undefined) {
        return docSnap.data();
      }
    }
    throw new Error("user doc does not exist");
  } else {
    console.log(docSnap.data());
    return docSnap.data();
  }
}

// gets challenger's data from firebase
export async function getChallengerDatabase() {
  const userData = await getUserDatabase();
  let uid = userData.invitedBy;
  let docRef = doc(db, "users", uid);
  let docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("challenger doc does not exist");
  } else {
    console.log("challenger db", docSnap.data());
    return docSnap.data();
  }
}

// call this function when user completes an action
// ADD email user after certain completed actions
export async function completedAction(action) {
  const userData = await getUserDatabase();
  const uid = auth.getAuth().currentUser.uid;
  // sign up for election reminders
  if (action === "election reminders") {
    emailUser(userData.email, "electionReminder");
    await updateChallengerBadges(userData);
    await updateDoc(doc(db, "users", uid), {
      notifyElectionReminders: true,
    });
  }
  // takes the challenge
  else if (action === "take challenge") {
    await updateChallengerBadges(userData);
    await updateDoc(doc(db, "users", uid), {
      startedChallenge: true,
    });
  }
  // registers to vote
  else if (action === "register to vote") {
    emailUser(userData.email, "registered");
    await updateChallengerBadges(userData);
    await updateDoc(doc(db, "users", uid), {
      isRegisteredVoter: true,
    });
    if (userData.startedChallenge) {
      await updateDoc(doc(db, "users", uid), {
        badges: arrayUnion({
          badge: {
            name: "you registered",
            icon: "mail",
          },
        }),
      });

      const userData = await getUserDatabase();
      if (userData.badges.length === 8) {
        emailUser(userData.email, "challengeWon");
      }
    }
  }
  // shares challenge
  else if (action === "share challenge") {
    await updateDoc(doc(db, "users", uid), {
      sharedChallenge: true,
    });
    if (userData.startedChallenge) {
      await updateDoc(doc(db, "users", uid), {
        badges: arrayUnion({
          badge: {
            name: "you shared",
            icon: "share",
          },
        }),
      });

      const userData = await getUserDatabase();
      if (userData.badges.length === 8) {
        emailUser(userData.email, "challengeWon");
      }
    }
    // remove after done testing
  } else if (action === "test add badge") {
    const name = "Mike" + Math.floor(Math.random() * 100) + 1;
    const num = Math.floor(Math.random() * 4) + 1;
    await updateDoc(doc(db, "users", uid), {
      badges: arrayUnion({
        badge: {
          name: name,
          icon: num,
        },
      }),
    });

    const userData = await getUserDatabase();
    if (userData.badges.length === 8) {
      emailUser(userData.email, "challengeWon");
    }
  } else {
    throw new Error("specified action does not exist");
  }
}

// gives challenger a badge for player's actions
async function updateChallengerBadges(userData) {
  const uid = auth.getAuth().currentUser.uid;
  if (
    userData.invitedBy !== "" &&
    userData.completedActionForChallenger === false
  ) {
    await updateDoc(doc(db, "users", userData.invitedBy), {
      badges: arrayUnion({
        badge: {
          name: userData.name,
          icon: userData.avatar,
          uid: uid,
        },
      }),
    });

    await updateDoc(doc(db, "users", uid), {
      completedActionForChallenger: true,
    });

    const challengerData = await getChallengerDatabase();

    if (challengerData.badges.length >= 8) {
      emailUser(challengerData.email, "challengeWon");
    } else {
      emailUser(challengerData.email, "badgeEarned");
    }
  }
}

// resets days left to complete challenge to 8
export async function restartChallenge() {
  const uid = auth.getAuth().currentUser.uid;
  await updateDoc(doc(db, "users", uid), {
    challengeEndDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  });
}

export async function makePlayerChallenger() {
  let uid = auth.getAuth().currentUser.uid;
  const userRef = doc(db, "users", await uid);
  
  await updateDoc(userRef, {
    startedChallenge: true,
    challengeEndDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
  });

  localStorage.removeItem("player")
}