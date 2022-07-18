import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import React from "react"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Cart from "./Pages/Cart"
import Product from "./Pages/Product"
import Checkout from "./Pages/Checkout"
import Success from "./Pages/Stripe/Success"
import NotFound from "./Components/NotFound"
import { QueryClient, QueryClientProvider } from "react-query"
import Account from "./Pages/Account"
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:slug" element={<Product />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<Success />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </QueryClientProvider>
  )
}

export default App
