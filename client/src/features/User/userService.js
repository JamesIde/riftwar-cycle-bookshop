// API calls to our backend
const axios = require("axios")

const API_URL = "/api/user"

const login = async userData => {
  const response = await axios.post(API_URL + "/login", userData)
  return response
}

const register = async formData => {
  // Call backend
  const response = await axios.post(API_URL + "/register", formData)

  return response
}
const userService = {
  login,
  register,
}
export default userService
