import { useQuery } from "react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"
import { logoutUser, updateUserDetails } from "../features/User/userSlice"
function Account() {
  const user = JSON.parse(localStorage.getItem("user"))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Populate logged in  user
  const [userInfo, setUserInfo] = useState(user)

  // User detail manager
  const [updateName, setUpdateName] = useState(user.name)
  const [updateEmail, setUpdateEmail] = useState(user.email)

  const { loading, error, data } = useQuery("orders", async () => {
    const response = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    return response.data
  })

  if (error) {
    console.log(error)
    return error.message
  }

  // TODO Account Page Table Responsiveness
  const handleSubmit = e => {
    e.preventDefault()
    const formData = {
      name: updateName,
      email: updateEmail,
    }
    dispatch(updateUserDetails(formData))
    dispatch(logoutUser())
    navigate("/")
    toast.success("User details updated")
  }

  return (
    <>
      <div className="w-6/12 mx-auto">{loading ? <Spinner /> : null}</div>
      {data ? (
        <>
          <div className="xl:w-6/12 mx-auto  text-center">
            <h1 className="text-2xl mt-4 mb-2">
              Hello, <strong>{userInfo.name}</strong>
            </h1>
            <p className="mt-2 mb-4">
              Below is your account information and recent orders.
            </p>
          </div>

          <div className="grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 xl:w-6/12 lg:w-6/12 md:w-5/12 w-7/12 mx-auto">
            <div className="grid-cols-1 w-full">
              <h3 className="text-center font-bold">Personal Information</h3>
              <div>
                <label htmlFor="name" className="block py-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userInfo.name}
                  disabled
                  className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block py-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={userInfo.email}
                  disabled
                  className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="text-right mt-5">
                <label
                  for="edit"
                  className="p-2 bg-indigo-500 text-white rounded modal-button hover:cursor-pointer"
                >
                  Edit Details
                </label>
              </div>
              {/* Edit Form Modal */}
              <input type="checkbox" id="edit" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box">
                  <h3 className="text-center font-bold">
                    Edit Personal Information
                  </h3>
                  <p className="text-sm flex flex-col text-center">
                    You will be logged out on details update.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block py-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={updateName}
                        onChange={e => setUpdateName(e.target.value)}
                        className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block py-2">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        value={updateEmail}
                        onChange={e => setUpdateEmail(e.target.value)}
                        className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="flex flex-row justify-between">
                      <button
                        type="submit"
                        className="p-2 bg-indigo-500 rounded text-white mt-3 w-max h-max"
                      >
                        Update Details
                      </button>

                      <label
                        for="edit"
                        class="modal-action p-2 bg-gray-500 rounded text-white mt-3 w-max h-max hover:cursor-pointer"
                      >
                        Close
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full grid-cols-1 mx-auto">
              <h3 className="text-center font-bold mt-2 mb-4">Recent Orders</h3>
              {data.data.length > 0 ? (
                <>
                  <table className="table-auto w-full ml-8">
                    <thead className="text-left">
                      <tr className="w-max">
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.data.map(order => {
                        return (
                          <>
                            <tr>
                              <td>#{order.orderId.slice(0, 17)}</td>

                              <td>
                                {new Date(order.createdAt).toLocaleDateString(
                                  "AU"
                                )}
                              </td>
                              <td>
                                {order.paymentStatus.charAt(0).toUpperCase() +
                                  order.paymentStatus.slice(1)}
                              </td>
                              <td>${order.total.orderTotal}</td>
                              <td>
                                <Link
                                  to={`/account/order/${order.orderId}`}
                                  state={{
                                    order: order,
                                  }}
                                >
                                  <p className="p-1 bg-indigo-500 rounded hover:cursor-pointer text-white text-center">
                                    View
                                  </p>
                                </Link>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <p className="text-center font-bold">
                    You have no orders yet!
                  </p>
                  <p className="font-bold mt-1 mb-1 text-blue-800 underline underline-offset-1 w-max mx-auto border-">
                    <Link to="/">Start shopping!</Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <p> Loading</p>
      )}
    </>
  )
}
export default Account
