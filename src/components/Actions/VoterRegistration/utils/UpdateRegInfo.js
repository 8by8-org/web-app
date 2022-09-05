import { auth } from "../../../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const db = getFirestore();

export async function addRegInfoToDB(infoBody) {
  const user = auth.getAuth().currentUser;
  updateDoc(doc(db, "users", user.uid), {
    voteInfo: infoBody
  });
}

export async function clearVoterRegInfo() {
  const user = auth.getAuth().currentUser;
  updateDoc(doc(db, "users", user.uid), {
    isRegisteredVoter: false,
    voteInfo: {}
  });
}
