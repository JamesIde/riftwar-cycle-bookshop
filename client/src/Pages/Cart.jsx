import CartItem from "../Components/CartItem"
import { useEffect } from "react"
import { getCart } from "../features/Products/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Spinner from "../Components/Spinner"
function Cart() {
  const dispatch = useDispatch()
  const { cart, isLoading } = useSelector(state => state.productReducer)
  useEffect(() => {
    // dispatch(getCart())
  }, [dispatch])

  function calculateTotalCost() {
    let total = 0

    cart.map(item => {
      total += item.quantity * item.price
    })
    return total
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="w-full p-2 bg-indigo-600 text-white  font-bold text-xl xl:w-[50%] mx-auto">
        <p>Shopping Cart</p>
      </div>

      {cart.length > 0 ? (
        cart.map(item => {
          return <CartItem product={item} />
        })
      ) : (
        <>
          <p className="text-center font-bold text-xl mt-4">
            Your cart appears to be empty!
          </p>
        </>
      )}
      {cart.length > 0 ? (
        <>
          <div className="xl:w-[50%] mx-auto mt-12 p-2">
            <div className="flex justify-end">
              <p className="text-right pr-2 font-bold">Total Cost (AUD): </p>
              <p className="text-right"> ${calculateTotalCost().toFixed(2)}</p>
            </div>
            <div className="text-right ml-auto">
              <p className="mt-1 mb-1 text-sm">Tax applied at checkout</p>
              <Link to="/checkout">
                <p className="p-2 rounded bg-indigo-700 text-white w-max ml-auto mt-2 mb-2 hover:cursor">
                  Proceed to Checkout
                </p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/">
            <p className="text-center  p-2 text-indigo-600 hover:text-indigo-500 font-medium hover:cursor-pointer">
              Continue Shopping
            </p>
          </Link>
        </>
      )}
    </>
  )
}
export default Cart
