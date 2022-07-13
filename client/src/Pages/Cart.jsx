import CartItem from "../Components/CartItem"
import { useEffect } from "react"
import { getCart } from "../features/Products/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
function Cart() {
  const dispatch = useDispatch()
  const { cart, isLoading } = useSelector(state => state.productReducer)
  useEffect(() => {
    dispatch(getCart())
  }, [])

  function calculateTotalCost() {
    let total = 0

    cart.map(item => {
      total += item.quantity * item.price
    })
    return total
  }

  return (
    <>
      <div className="w-[50%] mx-auto">
        <p className="p-2 bg-indigo-600 text-white text-xl font-bold mt-2 mb-1">
          Shopping Cart
        </p>
      </div>
      {cart.length > 0 ? (
        cart.map(item => {
          return <CartItem product={item} />
        })
      ) : (
        <>
          <p className="text-center font-bold text-xl">
            Your cart appears to be empty!
          </p>
        </>
      )}
      <div className="w-[50%] mx-auto mt-12 ">
        <div className="flex justify-end">
          <p className="text-right pr-2 font-bold">Total Cost (AUD): </p>
          <p className="text-right"> ${calculateTotalCost().toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <Link to="/">
            <p className="text-left  p-2 text-indigo-600 hover:text-indigo-500 font-medium hover:cursor-pointer">
              Continue Shopping
            </p>
          </Link>
          <p className="p-2 rounded bg-indigo-700 text-white w-max ml-auto mt-2 mb-2">
            Proceed to Checkout
          </p>
        </div>
      </div>
    </>
  )
}
export default Cart
