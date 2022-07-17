import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCart } from "../features/Products/productSlice"
import { createOrder } from "../features/Orders/orderSlice"
function Checkout() {
  // TODO form validation and clean this page up
  const dispatch = useDispatch()
  const { cart, isLoading } = useSelector(state => state.productReducer)
  useEffect(() => {
    dispatch(getCart())
  }, [])

  function calculateTotalItemCost() {
    let total = 0

    cart.map(item => {
      total += item.quantity * item.price
    })
    return total
  }

  // Calculate total item cost
  const totalItemCost = calculateTotalItemCost()

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postcode: "",
  })

  //Destructure formData
  const { email, name, phone, address, country, city, state, postcode } =
    formData

  const onChange = e => {
    // grabs previous state
    setFormData(prevState => ({
      // Spread across rest of the form
      ...prevState,
      // Target it by name, and set it to the value
      [e.target.name]: e.target.value,
    }))
  }

  const handleCheckout = e => {
    e.preventDefault()
    if (
      !email ||
      !name ||
      !phone ||
      !address ||
      !country ||
      !city ||
      !state ||
      !postcode
    ) {
      alert("Please fill out all fields")
    } else {
      // Create array to match the schema

      const cartData = cart.map(item => {
        return {
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item._id,
          imageUrl: item.image,
        }
      })

      // Create order object to be sent to the server
      const order = {
        cart: cartData,
        totalCost: parseFloat(totalItemCost + totalItemCost * 0.15).toFixed(2),
        user: formData,
      }

      dispatch(createOrder(order))
    }
  }

  return (
    <form onSubmit={handleCheckout}>
      <div className="xl:w-[50%] lg:w-[45%] md:w-[45%] w-full p-2 mx-auto grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
        <div className="w-full ">
          <h1 className="text-center font-bold text-xl">Shipping Details</h1>
          <p className="text-center text-sm mt-1 mb-2"></p>
          <div class="mt-4">
            <h2 className="text-md font-bold mb-4">Contact Information</h2>
            <div>
              <label class="block" for="email">
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
              />
            </div>
            <div className="mt-4">
              <label class="block" for="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
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
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
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
                id="address"
                name="address"
                value={address}
                onChange={onChange}
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
                id="country"
                name="country"
                value={country}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-2">
              <label class="block" for="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={onChange}
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
                id="state"
                name="state"
                value={state}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="ml-2">
              <label class="block" for="postcode">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={postcode}
                onChange={onChange}
                class="w-full px-4 py-2 mt-2 border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
        <div className="w-full xl:ml-10">
          <h1 className="text-xl font-bold text-center mt-4">Order Details</h1>
          <h3 className="text-md font-bold p-2">Product Details</h3>
          <div className="p-2">
            {cart.map(item => {
              return (
                <>
                  <div className="flex">
                    <img src={item.image} alt="" className="w-32 object-fit" />
                    <div>
                      <p className="text-md font-bold ml-2">{item.name}</p>
                      <p className="text-sm text-gray-500 ml-2 ">
                        {item.series}
                      </p>
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
          <div className="px-2 flex justify-between mb-4">
            <p className="font-bold">Order Items</p>
            <p>${parseFloat(totalItemCost).toFixed(2)}</p>
          </div>
          <hr className="mb-3" />
          <div className="px-2 flex justify-between mb-4">
            <p className="font-bold">Tax (GST)</p>
            <p>${parseFloat(totalItemCost * 0.15).toFixed(2)}</p>
          </div>
          <hr className="mb-3" />
          <div className="px-2 flex justify-between mb-4">
            <p className="font-bold">Total (AUD)</p>
            <p>
              ${parseFloat(totalItemCost + totalItemCost * 0.15).toFixed(2)}
            </p>
          </div>
          <div className="px-2">
            <button
              type="submit"
              className="p-2 bg-indigo-500 text-white w-full text-center rounded mx-auto"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
export default Checkout
