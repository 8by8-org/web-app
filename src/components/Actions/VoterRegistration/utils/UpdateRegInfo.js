import { auth } from "../../../../firebase";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
const db = getFirestore();

export async function addRegInfoToDB(infoBody) {
  const user = auth.getAuth().currentUser;
  updateDoc(doc(db, "users", user.uid), {
    voteInfo: {
      state: infoBody.state
    }
  });
  setDoc(doc(db, "voter-registration-data", user.uid), {
    ...infoBody
  });
}
