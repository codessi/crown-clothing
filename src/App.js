import "./categories.styles.scss"
import Home from "./routes/home/home.component"
import { Routes, Route, Outlet } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.componenet"
import Checkout from "./routes/checkout /checkout.componenet"

function App() {

// create CheckOut compo, styles
// make the route x
// useNavigate 
// turn on button and make it to go 
// "/checkout"
// test x
// gt checkout page x
// bring cartItems from context
// map  -- copy jsx from 
// create decrement and increment spans
// 


   return (
    
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route  index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App
