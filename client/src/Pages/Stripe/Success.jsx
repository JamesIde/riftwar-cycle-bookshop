import { useEffect, useState } from "react"
import { clearCart } from "../../features/Products/productSlice"
import { getOrder } from "../../features/Orders/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../Components/Spinner"
import { useQuery } from "react-query"
import axios from "axios"
function Success() {
  const API_URL = "/api/orders"

  const user = JSON.parse(localStorage.getItem("user"))

  const { isLoading, error, data } = useQuery("order", async () => {
    const orderId = localStorage.getItem("orderId")

    localStorage.removeItem("cart")
    const response = await axios.get(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    return response.data
  })

  if (isLoading) return <Spinner />

  if (error) return "An error has occurred: " + error.message

  return (
    <div className="xl:w-4/12 lg:w-4/12 md:w-8/12 w-11/12 mx-auto p-2">
      <h1 className="text-lg font-bold mt-2 mb-2">Thank you for your order!</h1>
      <p>Your order ID is {data.data.orderId}</p>
      <h3 className="text-lg font-bold mt-6">Order Items</h3>
      {data.data.products.map(product => {
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

      <>
        <div className="flex justify-between mt-12">
          <h3 className="text-lg font-bold ">Item Total</h3>
          <p className="text-md text-gray-500">${data.data.total.itemTotal}</p>
        </div>
        <hr className="mt-1 mb-2" />
        <div className="flex justify-between mt-5">
          <h3 className="text-lg font-bold ">Tax</h3>
          <p className="text-md text-gray-500">${data.data.total.tax}</p>
        </div>
        <hr className="mt-1 mb-2" />
        <div className="flex justify-between mt-2">
          <h3 className="text-lg font-bold">Order Total</h3>
          <p className="text-lg">${data.data.total.orderTotal}</p>
        </div>
      </>
    </div>
  )
}
export default Success
