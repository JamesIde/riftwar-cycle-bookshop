import { API } from "../../helper/API"

const login = async userData => {
  const response = await API.post("api/user/login", userData)
  return response
}

const register = async formData => {
  // Call backend
  const response = await API.post("api/user/register", formData)

  return response
}

const update = async (token, userData) => {
  const response = await API.put("api/user/update", userData, {
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
