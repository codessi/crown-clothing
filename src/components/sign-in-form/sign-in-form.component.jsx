import { useState, useContext } from "react"
import "./sign-in-form.styles.scss"
import Button from "../button/button.component"

import FormInput from "../form-input/form-input.component"
import {
  auth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import { updateProfile } from "firebase/auth"
import { UserContext } from "../../context/user.context"
const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)



  const { email, password } = formFields

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup()
    createUserDocumentFromAuth(response.user)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await signInUserWithEmailAndPassword(email, password)
  

      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password")
          break
        case "auth/user-not-found":
          alert("no user associated with this email")
          break
        case "auth/invalid-email":
          alert("invalid email")
          break

        default:
          console.log(error)
      }
      
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle} type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
