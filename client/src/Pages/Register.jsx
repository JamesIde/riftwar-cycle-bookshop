import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../features/User/userSlice"
import { toast } from "react-toastify"
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    state => state.userReducer
  )

  useEffect(() => {
    if (user) {
      toast.success("Registration Success!")
      navigate("/")
    }
    if (isError) {
      toast.error(message)
    }
  }, [navigate, user, isError])

  const onChange = e => {
    // grabs previous state
    setFormData(prevState => ({
      // Spread across rest of the form
      ...prevState,
      // Target it by name, and set it to the value
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !email || !password || !password2) {
      toast.error("Please fill in all fields")
    } else {
      dispatch(registerUser(formData))
    }
  }

  return (
    <>
      <div class="flex items-center justify-center ">
        <div class="px-8 py-6 text-left bg-white shadow-lg mt-40">
          <h3 class="text-2xl font-bold text-center">Register your details</h3>
          <form onSubmit={handleSubmit}>
            <div class="mt-4">
              <div>
                <label class="block" for="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mb-1"
                />
              </div>
              <div>
                <label class="block" for="email">
                  Email
                </label>
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Confirm password</label>
                <input
                  type="password2"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  placeholder="Confirm your password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <button
                  class="btn btn-active btn-primary w-full mt-2"
                  type="submit"
                >
                  Register
                </button>

                <p className="text-center text-sm mt-2 mb-2">
                  Already registed?
                </p>
                <Link to="/login">
                  <button class="btn btn-outline w-full">Login</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Register
