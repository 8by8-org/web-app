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

export function setUserType(type) {
  if (type === "challenger") {
    localStorage.setItem("userType", "challenger");
  } else if (type === "player") {
    localStorage.setItem("userType", "player");
  } else {
    console.error(`user type ${type} does not exist`);
  }
}

export function getUserType() {
  if (localStorage.getItem("userType")) {
    return localStorage.getItem("userType");
  } else {
    console.error("user does not have a type yet");
  }
}

export async function getUserDatabase() {
  const uid = auth.getAuth().currentUser.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    throw new Error("user doc does not exist");
  }
}

// call this function when user completes an aciton (register to vote, election reminders, takes challenge, shares challenge)
// could email user after certain completed actions
export async function completedAction(action) {
  const uid = auth.getAuth().currentUser.uid;
  if (action === "register to vote") {
    await updateChallengerBadges();
    updateDoc(doc(db, "users", uid), {
      isRegisteredVoter: true,
      badges: arrayUnion({ challengerBadge: "you registered" }),
    });
  } else if (action === "election reminders") {
    await updateChallengerBadges();
    updateDoc(doc(db, "users", uid), {
      notifyElectionReminders: true,
    });
  } else if (action === "take challenge") {
    await updateChallengerBadges();
    updateDoc(doc(db, "users", uid), {
      startedChallenge: true,
    });
  } else if (action === "share challenge") {
    updateDoc(doc(db, "users", uid), {
      sharedChallenge: true,
      badges: arrayUnion({ challengerBadge: "you shared" }),
    });
  } else {
    throw new Error("specified action does not exist");
  }
}

// gives challenger a badge for player actions
async function updateChallengerBadges() {
  const userData = await getUserDatabase();
  const uid = auth.getAuth().currentUser.uid;
  if (
    userData.invitedBy !== "" &&
    userData.completedActionForChallenger === false
  ) {
    updateDoc(doc(db, "users", userData.invitedBy), {
      badges: arrayUnion({
        playerBadge: {
          playerName: userData.name,
          playerAvatar: userData.avatar,
          playerID: uid,
        },
      }),
    });

    updateDoc(doc(db, "users", uid), {
      completedActionForChallenger: true,
    });
  }
}
