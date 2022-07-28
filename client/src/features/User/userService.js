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

const update = async (token, userData) => {
  const response = await axios.put(API_URL + "/update", userData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const userService = {
  login,
  register,
  update,
}

export default userService
