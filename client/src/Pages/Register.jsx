import { Link } from "react-router-dom"
function Register() {
  return (
    <>
      <div class="flex items-center justify-center ">
        <div class="px-8 py-6 text-left bg-white shadow-lg mt-40">
          <h3 class="text-2xl font-bold text-center">Register your details</h3>
          <form>
            <div class="mt-4">
              <div>
                <label class="block" for="name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mb-1"
                />
              </div>
              <div>
                <label class="block" for="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Confirm password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <button class="btn btn-active btn-primary w-full mt-2">
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
