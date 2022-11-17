import { Outlet, Link } from "react-router-dom"
import "./navigation.styles.scss"
import { ReactComponent as CrwnLogo } from "./../../asset/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  const {cartIsOpen, setCartIsOpen} = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser()
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
          JOhan
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon setCartIsOpen={setCartIsOpen} />
        </div>
       {cartIsOpen &&  <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
