import React from "react"
import Header from "./Components/Header"
import Home from "./Components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
