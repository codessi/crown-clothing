// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_wMPj0zL0QPsb3QmZv-Jxpw40IS794Mg",
  authDomain: "crown-clothing-f264f.firebaseapp.com",
  projectId: "crown-clothing-f264f",
  storageBucket: "crown-clothing-f264f.appspot.com",
  messagingSenderId: "732582362020",
  appId: "1:732582362020:web:bbb8cf2d64af7520641f31",
}

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)
// its' document reference. it's not document 

  const userSnapShot = await getDoc(userDocRef)
  console.log(userSnapShot)
  // but whe you try to get the ths object 
  // it will show empty db
  // .exitst checks if its empty or not
  // snapshot allow access data
  // snapshot check if exist.

  try {
    if (!userSnapShot.exists()) {
      const { email, displayName } = userAuth
      const createdAt = new Date()

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    }
  } catch (error) {
    console.log("error createing the user", error.message)
  }

  return userDocRef
}
