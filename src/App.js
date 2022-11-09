import "./categories.styles.scss"
import Home from "./routes/home/home.component"
import { Routes, Route, Outlet } from "react-router-dom"
import Navigation from "./components/navigation/navigation.component"
import SignIn from './routes/sign-in.component'



const ShopPage = () => {
  return <div>I am shop page</div>
}

function App() {


   return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route  index element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
