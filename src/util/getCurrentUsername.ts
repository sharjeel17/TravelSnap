import { doc, getDoc } from "firebase/firestore";
import { auth, mainDb } from "../FirebaseConfig/Firebase";
import { UserInfo } from "../types/types";

const getCurrentUsername = async () => {
    try{
        const docRef = doc(mainDb, "Users", auth.currentUser!.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() as UserInfo;
        return data.Username;

    } catch(err) {
        console.error(err);
        return "Unknown"
    } 
}

export default getCurrentUsername;