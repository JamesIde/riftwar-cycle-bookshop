import React from "react"
import Header from "./Components/Header"
import Home from "./Components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Cart from "./Pages/Cart"
import Product from "./Pages/Product"
import Footer from "./Components/Footer"
import Checkout from "./Pages/Checkout"
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
