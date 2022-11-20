// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore"
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log("done")
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories")
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()

    acc[title.toLowerCase()] = items
    return acc
  }, {})
  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapShot = await getDoc(userDocRef)

  try {
    if (!userSnapShot.exists()) {
      const { email, displayName } = userAuth
      const createdAt = new Date()

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    }
  } catch (error) {
    console.log("error creating the user", error.message)
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
  const res = await signOut(auth)
}

export const signInUserWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}
