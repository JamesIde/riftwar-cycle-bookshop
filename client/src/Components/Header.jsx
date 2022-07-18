import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/User/userSlice"
import { clearCart } from "../features/Products/productSlice"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Spinner from "./Spinner"

function Header() {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.userReducer)
  const { cart } = useSelector(state => state.productReducer)
  const handleClick = () => {
    dispatch(logoutUser())
    dispatch(clearCart())
  }

  return (
    <div class="navbar bg-base-100 xl:w-[51%] mx-auto">
      <div class="flex-1">
        <Link to="/">
          <a class="normal-case text-xl">Crydee Bookstore</a>
        </Link>
      </div>
      <div class="flex-none">
        {user ? (
          <>
            <div class="dropdown dropdown-end">
              <label tabindex="0" className="hover:cursor-pointer">
                <div>
                  <p>
                    Welcome, <strong>{user.name}</strong>
                  </p>
                </div>
              </label>
              <ul
                tabindex="0"
                class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to="/account">
                  <li>
                    <a>Account</a>
                  </li>
                </Link>

                <li>
                  <a onClick={handleClick}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row">
              <Link to="/login">
                <p className="p-2 btn btn-ghost">Login</p>
              </Link>
              <Link to="/login">
                <p className="p-2 btn btn-ghost">Register</p>
              </Link>
            </div>
          </>
        )}
        <div class="dropdown dropdown-end">
          <Link to="/cart">
            <label tabindex="0" className="btn btn-ghost btn-link ml-1">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Header
