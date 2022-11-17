
import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"
import './authentication.styles.scss'

import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"



const Authentication = () => {





    return (
        <div className="authentication-container">
            
           
            {/* <button onClick={handleSignout}>Sign out </button> */}
            <SignInForm />
            <SignUpForm />

        
        </div>
    )
}

export default Authentication