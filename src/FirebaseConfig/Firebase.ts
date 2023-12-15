import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export { imageDb, mainDb, auth };