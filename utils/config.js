import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userStore } from "../store";
const firebaseConfig = {
  apiKey: "AIzaSyB9hkHd3zfuWEusStfxcFYgqbyNRwUFj08",
  authDomain: "pizzes-2f536.firebaseapp.com",
  projectId: "pizzes-2f536",
  storageBucket: "pizzes-2f536.appspot.com",
  messagingSenderId: "198402340183",
  appId: "1:198402340183:web:85022e26ec75c1dde07a12",
  measurementId: "G-YBJVWQDJ3B",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(initializeApp(firebaseConfig));

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  // const storeUser = userStore((state) => state.setUser);

  try {
    const result = signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    console.log(error);
  }
};
