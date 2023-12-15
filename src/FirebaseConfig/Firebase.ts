import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAkyTFLxUdC4uiNcPocpMd31rOGxkR8j2k",
  authDomain: "travelsnap112.firebaseapp.com",
  projectId: "travelsnap112",
  storageBucket: "travelsnap112.appspot.com",
  messagingSenderId: "916561908102",
  appId: "1:916561908102:web:8a4286d337aa5f45d7dc07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);
const mainDb = getFirestore(app);
const auth = getAuth(app);

export { imageDb, mainDb, auth };