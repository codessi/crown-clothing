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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const findItem = cartItems.find((item) => {
    return item.id === cartItemToRemove.id
  })

  if (findItem.quantity === 1) {
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== cartItemToRemove.id
    )
    return filteredCartItems
  }

  const newCartItems = cartItems.map((item) => {
    if (item.id === cartItemToRemove.id) {
      return { ...item, quantity: item.quantity - 1 }
    }
    return item
  })

  return newCartItems
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  const newCartItems = cartItems.filter((cartItem) => {
    return cartItem.id !== cartItemToRemove.id
  })
  return newCartItems
}

// total... get each cartitem's price
const getTotal = (cartItems) => {
  const subTotalArray = cartItems.map((cartItem) => {
    const subTotal = cartItem.price * cartItem.quantity
    return subTotal
  })
 return subTotalArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
}
// multiplay by the quanity
// make a array
// reduce
// set total

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  removeCartItem: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  total: 0,
})

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false)

  const [cartItems, setCartItems] = useState([])

  const [cartCount, setCartCount] = useState(0)

  const [total, setTotal] = useState(0)

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product))
  }

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product))
  }

  useEffect(() => {
    const total = cartItems.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    console.log(total)
    setCartCount(total)
  }, [cartItems])

  useEffect(() => {
    setTotal(getTotal(cartItems))
    console.log(total)
  }, [cartItems])

  const value = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
