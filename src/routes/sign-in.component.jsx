
import { signInWithGooglePopup, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils"

import SignUpForm from "../components/sign-up-form/sign-up-form.component"
import { signOutFromGoogle } from "../utils/firebase/firebase.utils"


const SignIn = () => {



    const logGoogleUser  = async() => {
       const response = await signInWithGooglePopup()
       createUserDocumentFromAuth(response.user)
    }

    const handleSignout = () => {
        signOutFromGoogle()
    }
    return (
        <div>
            
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google</button>
            <button onClick={handleSignout}>Sign out </button>
            <SignUpForm />

        
        </div>
    )
}

export default SignIn