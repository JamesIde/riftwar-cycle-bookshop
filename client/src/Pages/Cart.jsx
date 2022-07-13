import CartItem from "../Components/CartItem"
function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"))
  return (
    <>
      {cart.length > 0 ? (
        cart.map(item => {
          return <CartItem product={item} />
        })
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  )
}
export default Cart
