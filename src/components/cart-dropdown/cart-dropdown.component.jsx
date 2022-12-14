import "./cart-dropdown.styles.scss"
import Button from "./../button/button.component"
import CartItem from "../cart-item/cart-item.component"

import { CartContext } from "../../context/cart.context"
import { useContext } from "react"

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div className="cart-dropdown-container">
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem = {item} />
      ))}
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
