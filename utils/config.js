import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9hkHd3zfuWEusStfxcFYgqbyNRwUFj08",
  authDomain: "pizzes-2f536.firebaseapp.com",
  projectId: "pizzes-2f536",
  storageBucket: "pizzes-2f536.appspot.com",
  messagingSenderId: "198402340183",
  appId: "1:198402340183:web:85022e26ec75c1dde07a12",
  measurementId: "G-YBJVWQDJ3B",
};

const auth = getAuth(initializeApp(firebaseConfig));

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};
