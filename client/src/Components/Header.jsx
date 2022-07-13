import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/User/userSlice"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Spinner from "./Spinner"

function Header() {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.userReducer)
  const { cart } = useSelector(state => state.productReducer)
  const handleClick = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="w-6/12 mx-auto h-24">
      <div className="flex justify-between xl: items-center h-full">
        <div className="">
          <Link to="/">
            <h1 className="text-center font-bold text-2xl mt-4 mb-4">
              Crydee Bookstore
            </h1>
          </Link>
        </div>
        <div className="flex p-2">
          {user ? (
            <>
              <p className="h-max w-max p-2  font-bold rounded ">
                Welcome, {user.name}
              </p>
              <p
                className="h-max w-max p-2  rounded ml-3 font-bold hover:cursor-pointer"
                onClick={handleClick}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <Link to="/login">
                <p className="h-max w-max p-2  font-bold rounded hover:cursor-pointer">
                  Login
                </p>
              </Link>
              <Link to="/register">
                <p className="h-max w-max p-2  rounded ml-3 font-bold hover:cursor-pointer">
                  Register
                </p>
              </Link>
            </>
          )}
          <Link to="/cart">
            <div className="inline-flex mt-[6px] ml-2">
              <AiOutlineShoppingCart className="mt-2" />
              <p className="pl-1 mt-[3px]">({cart.length})</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Header
