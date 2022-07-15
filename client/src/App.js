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
import Success from "./Components/Stripe/Success"
import Cancel from "./Components/Stripe/Cancel"
import NotFound from "./Components/NotFound"
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
          <Route path="/checkout-success" element={<Success />} />
          <Route path="/checkout-cancelled" element={<Cancel />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
