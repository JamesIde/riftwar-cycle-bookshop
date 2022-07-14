import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCart } from "../features/Products/productSlice"
function Checkout() {
  const dispatch = useDispatch()
  const { cart, isLoading } = useSelector(state => state.productReducer)
  const { user } = useSelector(state => state.userReducer)
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
    <div className="w-[50%] mx-auto grid grid-cols-2">
      <div className="w-full ">
        <h1 className="text-center font-bold text-xl">Shipping Details</h1>
        <p className="text-center text-sm mt-1 mb-2"></p>
        <form>
          <div class="mt-4">
            <h2 className="text-md font-bold mb-4">Contact Information</h2>
            <div>
              <label class="block" for="name">
                Email address
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
              />
            </div>
            <div className="mt-4">
              <label class="block" for="name">
                Full Name
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
              />
            </div>
          </div>
          <div class="mt-4">
            <div>
              <label class="block" for="phone">
                Phone Number
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div class="mt-4">
            <h2 className="text-md font-bold mb-4">Shipping Information</h2>

            <div>
              <label class="block" for="address">
                Address
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2">
            <div className="mr-2">
              <label class="block" for="country">
                Country
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-2">
              <label class="block" for="City">
                City
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2">
            <div className="mr-2">
              <label class="block" for="state">
                State
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-2">
              <label class="block" for="postalCode">
                Postal Code
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="w-full ml-10">
        <h1 className="text-xl font-bold text-center">Order Details</h1>
        <h3 className="text-md font-bold p-2">Product Details</h3>
        <div className="p-2">
          {cart.map(item => {
            return (
              <>
                <div className="flex">
                  <img src={item.image} alt="" className="w-32 object-fit" />
                  <div>
                    <p className="text-md font-bold ml-2">{item.name}</p>
                    <p className="text-sm text-gray-500 ml-2 ">{item.series}</p>
                    <p className="p-2 text-sm mt-32">
                      <strong>Quantity: </strong>
                      {item.quantity}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-center">
                      <strong>Total</strong>
                    </p>
                    <p>${item.quantity * item.price}</p>
                  </div>
                </div>

                <hr className="mt-2 mb-4" />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Checkout
