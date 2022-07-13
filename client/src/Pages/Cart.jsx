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

  return (
    <>
      {cart.length > 0 ? (
        cart.map(item => {
          return <CartItem product={item} />
        })
      ) : (
        <>
          <p className="text-center font-bold text-xl">
            Your cart appears to be empty!
          </p>
          <Link to="/">
            <p className="text-center font-bold text-xl mt-2 text-cyan-600 underline underline-offset-4">
              Lets fix that!
            </p>
          </Link>
        </>
      )}
    </>
  )
}
export default Cart
