import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { loginUser } from "../features/User/userSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isError, message, user } = useSelector(
    state => state.userReducer
  )

  useEffect(() => {
    if (user) {
      navigate("/")
      toast.success(`Welcome, ${user.name}`)
    }

    if (isError) {
      toast.error(message)
    }
  }, [isError, navigate, user, message])

  const handleSubmit = e => {
    e.preventDefault()

    if (!email || !password) {
      // toast.error("Please enter all fields!")
    } else {
      //Form data
      const userData = {
        email,
        password,
      }
      dispatch(loginUser(userData))
    }
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
                <button class="btn w-full btn-primary mt-3 mb-2">LOGIN</button>

                <p className="text-center text-sm mt-1 mb-2">
                  Create an account
                </p>
                <Link to="/register">
                  <button class="btn btn-outline w-full">Register</button>
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
