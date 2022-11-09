import { signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"


const SignIn = () => {
    const logGoogleUser  = async() => {
       const response = await signInWithGooglePopup()
       createUserDocumentFromAuth(response.user)

    }
// setup firestore online
//change rule to true for read and write 
// 
    return (
        <div>
            
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup </button>
        </div>
    )
}

export default SignIn