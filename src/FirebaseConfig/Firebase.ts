import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBa-ldXnsOChusUeEq7sDH1sU2xyxbXBQA",
  authDomain: "travelsnap-111.firebaseapp.com",
  projectId: "travelsnap-111",
  storageBucket: "travelsnap-111.appspot.com",
  messagingSenderId: "672463307762",
  appId: "1:672463307762:web:773b48fe149ffd8237e16b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);
const mainDb = getFirestore(app);
const auth = getAuth(app);

export { imageDb, mainDb, auth };