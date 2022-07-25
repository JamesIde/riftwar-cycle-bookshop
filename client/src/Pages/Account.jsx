import { useQuery } from "react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Spinner from "../Components/Spinner"
function Account() {
  const user = JSON.parse(localStorage.getItem("user"))

  // Populate logged in  user
  const [userInfo, setUserInfo] = useState(user)
  // Toggle edit user details
  const [isDisabled, setisDisabled] = useState(true)
  const [isHidden, setisHidden] = useState(true)

  // User detail manager
  const [updateName, setUpdateName] = useState("")
  const [updateEmail, setUpdateEmail] = useState("")

  const enableEdit = e => {
    e.preventDefault()
    setisHidden(isHidden => !isHidden)
    setisDisabled(isDisabled => !isDisabled)
  }

  //TODO On update, send user deets to backend, get response,
  // Update it on UI
  // Then disable button

  // Fetch the order information
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

          <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:w-6/12 lg:w-6/12 md:w-5/12 w-7/12 mx-auto">
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
                  disabled={isDisabled}
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
                  value={userInfo.email}
                  disabled={isDisabled}
                  onChange={e => setUpdateEmail(e.target.value)}
                  className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex flex-row justify-between mt-2">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                  hidden={isHidden}
                >
                  Update
                </button>

                {/* <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                  onClick={enableEdit}
                >
                  Edit
                </button> */}
              </div>
            </div>
            <div className="w-full grid-cols-1">
              <h3 className="text-center font-bold mt-2 mb-4">Recent Orders</h3>
              {data.length > 0 ? (
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
                              <td>{order.paymentStatus}</td>
                              <td>${order.total.orderTotal}</td>
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
