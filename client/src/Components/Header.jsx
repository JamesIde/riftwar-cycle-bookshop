import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
function Header() {
  const { user } = useSelector(state => state.userReducer)
  return (
    <div className="w-6/12 mx-auto h-24">
      <div className="flex justify-between items-center h-full">
        <div className="">
          <Link to="/">
            <h1 className="text-center font-bold text-2xl mt-4 mb-4">
              The Riftwar Saga Bookshop
            </h1>
          </Link>
        </div>
        <div className="flex p-2">
          {user ? (
            <>
              <p className="h-max w-max p-2  font-bold rounded ">
                Welcome, {user.name}
              </p>
              <p className="h-max w-max p-2  rounded ml-3 font-bold hover:cursor-pointer">
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
        </div>
      </div>
    </div>
  )
}
export default Header
