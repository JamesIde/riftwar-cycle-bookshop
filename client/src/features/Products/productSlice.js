const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const axios = require("axios")

const API_URL = "/api/products"

const initialState = {
  cart: [],
  products: [],
  selectedItem: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Products fetched!"
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const fetchProducts = createAsyncThunk(
  "item/getProducts",
  async thunkAPI => {
    try {
      const response = await axios.get(API_URL)

      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

export default productSlice.reducer
