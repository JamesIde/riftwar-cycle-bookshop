import { useEffect } from "react"
import { clearCart } from "../../features/Products/productSlice"
import { getOrder } from "../../features/Orders/orderSlice"
import { useDispatch, useSelector } from "react-redux"
function Success() {
  const { order } = useSelector(state => state.orderReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    // Clear cart
    dispatch(clearCart())
    localStorage.removeItem("cart")

    // Get the order
    const orderId = localStorage.getItem("orderId")
    dispatch(getOrder(orderId))
  }, [dispatch])

  // TODO move these.
  // Duplicated code from checkout page
  function calcTax() {
    let tax = 0
    order.products.forEach(product => {
      tax += product.price * product.quantity * 0.15
    })
    return tax
  }
  function calcTotal() {
    let total = 0
    order.products.forEach(product => {
      total += product.price * product.quantity
    })
    return total
  }

  return (
    <div className="xl:w-4/12 mx-auto p-2">
      <h1 className="text-lg font-bold mt-2 mb-2">Thank you for your order!</h1>
      <p>Your order asdasd is {order.orderId}</p>

      <h3 className="text-lg font-bold mt-6">Order Items</h3>
      {order.products.map(product => {
        return (
          <div class="mt-2 mx-auto">
            <div class="">
              <ul role="list" class="-my-6 ">
                <li class="flex py-6">
                  <div class=" flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-lg">{product.productName}</h3>
                        <p class="ml-4">${product.price * product.quantity}</p>
                      </div>
                    </div>
                    <div class="flex flex-1  justify-between text-sm">
                      <div class="justify-between text-base font-medium ">
                        <p className="text-sm text-gray-500">
                          Quantity:{" "}
                          <strong className="text-black">
                            {product.quantity}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        )
      })}
      <div className="flex justify-between mt-12">
        <h3 className="text-lg font-bold ">Item Total</h3>
        <p className="text-md text-gray-500">
          ${parseFloat(calcTotal().toFixed(2))}
        </p>
      </div>
      <hr className="mt-1 mb-2" />
      <div className="flex justify-between mt-5">
        <h3 className="text-lg font-bold ">Tax</h3>
        <p className="text-md text-gray-500">
          ${parseFloat(calcTax().toFixed(2))}
        </p>
      </div>
      <hr className="mt-1 mb-2" />
      <div className="flex justify-between mt-2">
        <h3 className="text-lg font-bold">Order Total</h3>
        <p className="text-lg">${order.total}</p>
      </div>
    </div>
  )
}
export default Success
