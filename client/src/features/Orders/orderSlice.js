import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "/api/orders"
const STRIPE_API_URL = "/api/stripe"
const initialState = {
  order: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createOrder.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.order = action.payload
    })
    builder.addCase(createOrder.rejected, state => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = ""
    })
  },
})

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userReducer.user.token
      const response = await axios.post(
        `${STRIPE_API_URL}/create-checkout-session`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      // If the response contains the URL returned from the session, redirect the user to that URL. This is where the user enters their payment information.
      if (response.data.url) {
        // Push user to session
        window.location.href = response.data.url
        console.log(response.data)
      } else {
        console.log(response.data)
      }
      return response.data.sessionId
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
      console.log(error)
    }
  }
)

export default orderSlice.reducer
