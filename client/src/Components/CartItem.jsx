import { useDispatch, useSelector } from "react-redux"
import {
  getCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from "../features/Products/productSlice"
import Spinner from "./Spinner"
function CartItem({ product }) {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.productReducer)

  if (isLoading) {
    return <Spinner />
  }

  // Events
  const removeItemFromCart = productId => {
    dispatch(removeFromCart(productId))
    dispatch(getCart())
  }

  const increaseCartQuantity = productId => {
    dispatch(incrementQuantity(productId))
  }

  const decreaseCartQuantity = productId => {
    if (
      product.quantity == 1 &&
      window.confirm("Are you sure you want to remove this item?")
    ) {
      dispatch(decrementQuantity(productId))
    } else {
      dispatch(decrementQuantity(productId))
    }
  }

  return (
    <>
      <div class="mt-8 xl:w-6/12 mx-auto">
        <div class="flow-root">
          <ul role="list" class="-my-6 divide-y divide-gray-200">
            <li class="flex py-6">
              <div class="h-60 w-40  rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.description}
                  class="object-fit object-cover"
                />
              </div>
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3 className="text-xl">{product.name}</h3>
                    <p class="ml-4">${product.price * product.quantity}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{product.series}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <div class="justify-between text-base font-medium text-gray-900">
                    <p className="text-sm pl-1 pr-1 mb-1">Quantity</p>
                    <div className="flex pl-1 pr-1 rounded border-2">
                      <div
                        className="p-1 hover:cursor-pointer"
                        onClick={() => increaseCartQuantity(product._id)}
                      >
                        +
                      </div>
                      <div className="p-1">{product.quantity}</div>
                      {product.quantity == 1 ? (
                        <></>
                      ) : (
                        <div
                          className="p-1 hover:cursor-pointer"
                          onClick={() => decreaseCartQuantity(product._id)}
                        >
                          -
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="flex">
                    <button
                      type="button"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        removeItemFromCart(product._id)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </>
  )
}
export default CartItem
