import "./cart-dropdown.styles.scss"
import Button from "./../button/button.component"
import CartItem from "../cart-item/cart-item.component"

import { CartContext } from "../../context/cart.context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)

  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="cart-dropdown-container">
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem = {item} />
      ))}
      <Button onClick= {handleCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
