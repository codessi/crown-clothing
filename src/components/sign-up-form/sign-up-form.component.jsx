import { useState } from "react"
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

import FormInput from "../form-input/form-input.component"
import {
  createAuthUserWithEmailAndPassword,
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import { updateProfile } from "firebase/auth"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("passwords do not match.")
      return
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)

      await updateProfile(response.user, { displayName: displayName }).catch(
        (error) => console.log(error)
      )

      await createUserDocumentFromAuth(response.user, { displayName }).catch(
        (error) => console.log(error)
      )

      resetFormFields()
    } catch (error) {
      console.log("user creation encountered error", error)
    }
  }

  return (

    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button  type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
