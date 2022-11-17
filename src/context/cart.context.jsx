import { createContext, useState } from "react"

export const CartContext = createContext(
    {
        cartIsOpen: false,
        setCartIsOpen: () => {},


    }
)

export const CartProvider = ({ children }) => {

  const [cartIsOpen, setCartIsOpen] = useState(false)

  const [cartItems, setCartItems] = useState([])
 
  const value = { cartIsOpen, setCartIsOpen, cartItems, setCartItems}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
