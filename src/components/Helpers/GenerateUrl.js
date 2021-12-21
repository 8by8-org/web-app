import { getFirestore, getDoc, doc} from 'firebase/firestore'
import { useAuth } from "../contexts/AuthContext";

export default function GenerateUrl() {
  const { currentUser } = useAuth();

  async function getUserInfo() {
    const db = getFirestore();
    const userDoc = doc(db, "users", currentUser.uid)
    const user = await getDoc(userDoc);
    return user._document.data.value.mapValue.fields.inviteCode.stringValue;
  }
   
   //generate url based on current user's invitecode
   const code = getUserInfo()
   return `${window.location.origin}/playerwelcome?code=${code}`

}