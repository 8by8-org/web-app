import { auth } from "./../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const db = getFirestore();

export async function addUserToDB(name, avatar, endDate, isStarted) {
  await setTimeout(() => {
    const user = auth.getAuth().currentUser;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      name: name,
      avatar: avatar,
      challengeEndDate: endDate,
      startedChallenge: isStarted,
    });
  }, 3000);
}
