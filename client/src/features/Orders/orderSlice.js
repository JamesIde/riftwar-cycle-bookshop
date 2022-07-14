import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "/api/orders"

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
      // Get user token
      const token = thunkAPI.getState().userReducer.user.token
      const response = await axios.post(API_URL, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
      // const response = await axios.post(API_URL, orderData)
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)
export default orderSlice.reducer
