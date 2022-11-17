import { ReactComponent as ShoppingIcon } from '../../asset/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'

import './cart-icon.styles.scss'

const CartIcon = () => {
   const {setCartIsOpen, cartIsOpen} = useContext(CartContext)
    return (
        <div  onClick ={() =>setCartIsOpen(!cartIsOpen)} className="cart-icon-container">
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;