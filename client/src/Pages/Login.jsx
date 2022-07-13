import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { loginUser } from "../features/User/userSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isError } = useSelector(state => state.userReducer)

  const handleSubmit = e => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(loginUser(userData))
    navigate("/")
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div class="flex items-center justify-center ">
        <div class="px-8 py-6 text-left bg-white shadow-lg mt-40">
          <h3 class="text-2xl font-bold text-center">Login to your account</h3>
          <form onSubmit={handleSubmit}>
            <div class="mt-4">
              <div>
                <label class="block" for="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">
                  Login
                </button>
                <p className="text-center text-sm mt-2 mb-2">
                  Create an account
                </p>
                <Link to="/register">
                  <button class="px-6 py-2  border-[1px] border-black hover:bg-gray-100 rounded-lg  w-full">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
