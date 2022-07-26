import { Link, useParams, useLocation } from "react-router-dom"

function Order() {
  const location = useLocation()

  const { order } = location.state
  console.log(order)
  return (
    <div className="xl:w-4/12 lg:w-4/12 md:w-8/12 w-11/12 mx-auto p-2">
      <h1 className="text-lg font-bold mt-2 mb-2 text-center">Invoice </h1>
      <p>
        {" "}
        <strong>Order ID</strong> {order.orderId}
      </p>
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

      <>
        <div className="flex justify-between mt-12">
          <h3 className="text-lg font-bold ">Item Total</h3>
          <p className="text-md text-gray-500">${order.total.itemTotal}</p>
        </div>
        <hr className="mt-1 mb-2" />
        <div className="flex justify-between mt-5">
          <h3 className="text-lg font-bold ">Tax</h3>
          <p className="text-md text-gray-500">${order.total.tax}</p>
        </div>
        <hr className="mt-1 mb-2" />
        <div className="flex justify-between mt-2">
          <h3 className="text-lg font-bold">Order Total</h3>
          <p className="text-lg">${order.total.orderTotal}</p>
        </div>
        <div>
          <Link to="/account">
            <button className="p-2 w-full bg-indigo-500 text-white rounded mt-3 mb-3">
              <p>RETURN TO ACCOUNT</p>
            </button>
          </Link>
        </div>
      </>
    </div>
  )
}
export default Order
