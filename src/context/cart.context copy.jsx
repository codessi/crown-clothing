import { createContext, useEffect, useState } from "react"

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((item) => {
      if (productToAdd.id === item.id) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

// create state about cart count x
// create use effect that triggers when cartItems changes x
// insert function that get the total items.x
// take all the cartItems obj and find the qty and create totalx
// set the cartCountx
// connect to cartIcon

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
})

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false)

  const [cartItems, setCartItems] = useState([])

  const [cartCount, setCartCount] = useState(0)

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems?.reduce((total,item) => {
        return total + item.quantity
      },0)
      console.log(total)
      setCartCount(total)
    }
  }, [cartItems])

  const value = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
