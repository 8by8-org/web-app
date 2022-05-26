import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

export async function addInvitedBy() {
    let uid = auth.getAuth().currentUser.uid;
    const userRef = doc(db, "users", await uid);
    
    await updateDoc(userRef, {
      invitedBy: JSON.parse(localStorage.getItem("challengerInfo"))
        .challengerID,
    });
  
    localStorage.removeItem("player")
}